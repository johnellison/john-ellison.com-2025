import { fal } from "@fal-ai/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import https from "https";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

if (!process.env.FAL_KEY) {
    console.error("Error: FAL_KEY not found in .env.local");
    process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: npx tsx scripts/upscale-image.ts <path-to-image>");
    process.exit(1);
}

const imagePath = args[0];
const absolutePath = path.resolve(imagePath);

if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found at ${absolutePath}`);
    process.exit(1);
}

async function uploadImage(filePath: string): Promise<string> {
    console.log(`Uploading ${filePath}...`);
    try {
        // Fal client handles storage upload if you pass a file
        // However, the docs often suggest submitting a URL. 
        // We will try using the storage upload utility from the client.
        const fileBuffer = fs.readFileSync(filePath);
        const blob = new Blob([fileBuffer]);
        const url = await fal.storage.upload(blob);
        console.log(`Uploaded to: ${url}`);
        return url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

async function upscaleImage(imageUrl: string) {
    console.log("Submitting upscale request to fal-ai/ideogram/upscale...");
    try {
        const result: any = await fal.subscribe("fal-ai/ideogram/upscale", {
            input: {
                image_url: imageUrl,
                resemblance: 60, // Slightly higher resemblance to keep it close to original
                detail: 60,      // Enhance detail
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS" && update.logs) {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });
        return result;
    } catch (error) {
        console.error("Error asking for upscale:", error);
        throw error;
    }
}

function downloadImage(url: string, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log(`Download complete: ${outputPath}`);
                resolve();
            });
        }).on("error", (err) => {
            fs.unlink(outputPath, () => { }); // Delete the file async. (But we don't check the result)
            reject(err);
        });
    });
}

(async () => {
    try {
        const imageUrl = await uploadImage(absolutePath);
        const result = await upscaleImage(imageUrl);

        if (result.data && result.data.images && result.data.images.length > 0) {
            const upscaledUrl = result.data.images[0].url;
            console.log(`Upscaled image available at: ${upscaledUrl}`);

            // Replace the original file
            // Alternatively, we could save as separate file first.
            // Let's replace it as requested to "overwrite".

            // Backup just in case
            const backupPath = absolutePath + ".bak";
            fs.copyFileSync(absolutePath, backupPath);
            console.log(`Original backed up to: ${backupPath}`);

            await downloadImage(upscaledUrl, absolutePath);
            console.log(`Successfully upscaled and replaced: ${absolutePath}`);

            // Optional: remove backup if successful? Leaving it for now.
        } else {
            console.error("No images returned in result:", result);
        }

    } catch (error) {
        console.error("Script failed:", error);
        process.exit(1);
    }
})();
