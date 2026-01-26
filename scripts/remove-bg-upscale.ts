import { fal } from "@fal-ai/client";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";

dotenv.config({ path: ".env.local" });

if (!process.env.FAL_KEY) {
  console.error("Error: FAL_KEY not found in .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage: npx tsx scripts/remove-bg-upscale.ts <path-to-image> [model] [scale] [output-path]"
  );
  console.error("Models: portrait | general | heavy | bria");
  process.exit(1);
}

const inputPath = path.resolve(args[0]);
const modelArg = (args[1] || "portrait").toLowerCase();
const scale = Number(args[2] || "2");

if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found at ${inputPath}`);
  process.exit(1);
}

if (!Number.isFinite(scale) || scale <= 0) {
  console.error("Error: scale must be a positive number (e.g., 2)");
  process.exit(1);
}

type BgModelConfig = {
  endpoint: string;
  modelType?: string;
};

const BG_MODELS: Record<string, BgModelConfig> = {
  portrait: { endpoint: "fal-ai/birefnet", modelType: "Portrait" },
  general: { endpoint: "fal-ai/birefnet", modelType: "General Use (Light)" },
  heavy: { endpoint: "fal-ai/birefnet", modelType: "General Use (Heavy)" },
  bria: { endpoint: "fal-ai/bria/background/remove" },
};

const modelConfig = BG_MODELS[modelArg];
if (!modelConfig) {
  console.error(`Error: Unknown model "${modelArg}"`);
  console.error("Models: portrait | general | heavy | bria");
  process.exit(1);
}

const outputPath = args[3]
  ? path.resolve(args[3])
  : path.join(path.dirname(inputPath), `${path.parse(inputPath).name}_no_bg.png`);

async function uploadImage(filePath: string): Promise<string> {
  console.log(`Uploading ${filePath}...`);
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  const url = await fal.storage.upload(blob);
  console.log(`Uploaded to: ${url}`);
  return url;
}

function extractResultUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const image = record.image as { url?: string } | undefined;
  const output = record.output as { url?: string } | string | undefined;
  const url = record.url as string | undefined;

  if (image?.url) return image.url;
  if (typeof output === "string") return output;
  if (output && typeof output === "object" && output.url) return output.url;
  if (url) return url;

  return null;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readJsonResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

async function pollResult(requestId: string): Promise<string> {
  const start = Date.now();
  const timeoutMs = 120000;

  while (Date.now() - start < timeoutMs) {
    const response = await fetch(`https://queue.fal.run/requests/${requestId}/status`, {
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
      },
    });

    const status = await readJsonResponse(response);
    const responsePayload = (status.response || status) as Record<string, unknown>;
    const url = extractResultUrl(responsePayload);

    if (url) return url;

    if (status.status === "FAILED" || status.error) {
      throw new Error(`Fal request failed: ${JSON.stringify(status)}`);
    }

    await delay(1000);
  }

  throw new Error("Timed out waiting for fal.ai result");
}

async function callFal(endpoint: string, body: Record<string, unknown>): Promise<string> {
  const response = await fetch(`https://queue.fal.run/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(`Fal request failed: ${JSON.stringify(result)}`);
  }

  const url = extractResultUrl(result);
  if (url) return url;

  const requestId = result.request_id as string | undefined;
  if (requestId) return pollResult(requestId);

  throw new Error("No output URL returned by fal.ai");
}

function downloadImage(url: string, outputFilePath: string) {
  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(outputFilePath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(outputFilePath, () => {});
        reject(err);
      });
  });
}

async function upscaleImage(imageUrl: string, upscaleFactor: number): Promise<string> {
  console.log("Submitting upscale request to fal-ai/clarity-upscaler...");
  return callFal("fal-ai/clarity-upscaler", {
    image_url: imageUrl,
    scale: upscaleFactor,
    enable_safety_checker: false,
  });
}

async function removeBackground(imageUrl: string, model: BgModelConfig): Promise<string> {
  console.log(`Submitting background removal request to ${model.endpoint}...`);
  const body: Record<string, unknown> = {
    image_url: imageUrl,
  };

  if (model.modelType) {
    body.model = model.modelType;
  }

  return callFal(model.endpoint, body);
}

(async () => {
  try {
    const uploadedUrl = await uploadImage(inputPath);
    const upscaledUrl = await upscaleImage(uploadedUrl, scale);
    const bgRemovedUrl = await removeBackground(upscaledUrl, modelConfig);

    await downloadImage(bgRemovedUrl, outputPath);
    console.log(`Saved background-removed HD image to: ${outputPath}`);
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
})();
