import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface ImageFormat {
    name: string;
    width: number;
    height: number;
}

const IMAGE_FORMATS: ImageFormat[] = [
    { name: 'og', width: 1200, height: 630 },
    { name: 'linkedin', width: 1200, height: 627 },
    { name: 'twitter', width: 1200, height: 675 },
    { name: 'instagram', width: 1080, height: 1350 },
    { name: 'square', width: 1080, height: 1080 },
];

// Create an SVG with text that can be overlaid on the image
function createTextOverlaySvg(
    title: string,
    category: string,
    width: number,
    height: number
): string {
    // Calculate font sizes based on dimensions
    const titleFontSize = Math.min(width / 15, 72);
    const categoryFontSize = Math.min(width / 30, 24);
    const padding = width * 0.08;

    // Word wrap the title
    const maxCharsPerLine = Math.floor(width / (titleFontSize * 0.5));
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
            currentLine = (currentLine + ' ' + word).trim();
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);

    // Limit to 3 lines
    const displayLines = lines.slice(0, 3);
    if (lines.length > 3) {
        displayLines[2] = displayLines[2].slice(0, -3) + '...';
    }

    const lineHeight = titleFontSize * 1.2;
    const totalTextHeight = displayLines.length * lineHeight + categoryFontSize + 20;
    const textStartY = height - padding - totalTextHeight;

    const titleTspans = displayLines
        .map((line, i) => `<tspan x="${padding}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
        .join('');

    return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#a78bfa"/>
          <stop offset="100%" style="stop-color:#60a5fa"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.5"/>
        </filter>
      </defs>

      <!-- Category badge -->
      <text
        x="${padding}"
        y="${textStartY}"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${categoryFontSize}"
        font-weight="600"
        fill="url(#textGradient)"
        text-transform="uppercase"
        letter-spacing="2"
      >${escapeXml(category.replace('-', ' ').toUpperCase())}</text>

      <!-- Title -->
      <text
        x="${padding}"
        y="${textStartY + categoryFontSize + 20}"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${titleFontSize}"
        font-weight="700"
        fill="white"
        filter="url(#shadow)"
      >${titleTspans}</text>

      <!-- Author -->
      <text
        x="${padding}"
        y="${height - padding + 10}"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${categoryFontSize * 0.9}"
        fill="rgba(255,255,255,0.7)"
      >John Ellison</text>
    </svg>
  `;
}

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Create a gradient background
async function createGradientBackground(width: number, height: number): Promise<Buffer> {
    // Create SVG gradient
    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f0f12"/>
          <stop offset="50%" style="stop-color:#1a1a2e"/>
          <stop offset="100%" style="stop-color:#0f0f12"/>
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="70%" r="60%">
          <stop offset="0%" style="stop-color:rgba(139,92,246,0.3)"/>
          <stop offset="100%" style="stop-color:rgba(139,92,246,0)"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
    </svg>
  `;

    return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function generatePromoImages(
    slug: string,
    title: string,
    category: string,
    featuredImage?: string
): Promise<Record<string, string>> {
    const outputDir = path.join(process.cwd(), 'public', 'images', 'blog', slug, 'promo');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    const results: Record<string, string> = {};

    for (const format of IMAGE_FORMATS) {
        const outputPath = path.join(outputDir, `${format.name}.png`);
        const publicPath = `/images/blog/${slug}/promo/${format.name}.png`;

        try {
            let baseImage: sharp.Sharp;

            // Try to use the featured image as base, otherwise create gradient
            if (featuredImage) {
                const imagePath = path.join(process.cwd(), 'public', featuredImage);
                try {
                    baseImage = sharp(imagePath).resize(format.width, format.height, {
                        fit: 'cover',
                        position: 'center',
                    });

                    // Add dark overlay for text readability
                    const overlay = `
            <svg width="${format.width}" height="${format.height}">
              <defs>
                <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:rgba(0,0,0,0.2)"/>
                  <stop offset="60%" style="stop-color:rgba(0,0,0,0.5)"/>
                  <stop offset="100%" style="stop-color:rgba(0,0,0,0.85)"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#overlay)"/>
            </svg>
          `;

                    baseImage = baseImage.composite([
                        { input: Buffer.from(overlay), blend: 'over' },
                    ]);
                } catch {
                    // Fall back to gradient if image can't be loaded
                    const gradientBuffer = await createGradientBackground(format.width, format.height);
                    baseImage = sharp(gradientBuffer);
                }
            } else {
                const gradientBuffer = await createGradientBackground(format.width, format.height);
                baseImage = sharp(gradientBuffer);
            }

            // Add text overlay
            const textSvg = createTextOverlaySvg(title, category, format.width, format.height);

            await baseImage
                .composite([{ input: Buffer.from(textSvg), blend: 'over' }])
                .png()
                .toFile(outputPath);

            results[format.name] = publicPath;
        } catch (error) {
            console.error(`Failed to generate ${format.name} image:`, error);
        }
    }

    return results;
}
