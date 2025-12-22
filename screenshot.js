import puppeteer from 'puppeteer';

const YOUTUBE_BANNER_WIDTH = 2048;
const YOUTUBE_BANNER_HEIGHT = 1152;

async function captureScreenshot() {
  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport to exact YouTube banner dimensions
    await page.setViewport({
      width: YOUTUBE_BANNER_WIDTH,
      height: YOUTUBE_BANNER_HEIGHT,
      deviceScaleFactor: 1,
    });

    console.log(`Viewport set to ${YOUTUBE_BANNER_WIDTH}x${YOUTUBE_BANNER_HEIGHT}`);

    // Navigate to splash page
    console.log('Loading splash page...');
    await page.goto('http://localhost:3000/splash.html', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a moment for animations to settle
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot
    console.log('Capturing screenshot...');
    await page.screenshot({
      path: 'youtube-banner.png',
      type: 'png',
      fullPage: false
    });

    console.log('✅ Screenshot saved as youtube-banner.png');
    console.log(`   Dimensions: ${YOUTUBE_BANNER_WIDTH}x${YOUTUBE_BANNER_HEIGHT}px`);
  } catch (error) {
    console.error('❌ Error capturing screenshot:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshot();
