const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// List of sites to screenshot (matching the inspirations page data)
const sites = [
  { name: 'sidebar', url: 'https://sidebar.io/' },
  { name: 'the-pudding', url: 'https://pudding.cool/' },
  { name: 'design-systems', url: 'https://designsystems.surf/design-systems' },
  { name: 'shadcn-ui', url: 'https://ui.shadcn.com/' },
  { name: 'cosmos', url: 'https://www.cosmos.so/discover' },
  { name: 'books-about-food', url: 'https://www.booksabout.food/people' },
  { name: 'curated-design', url: 'https://www.curated.design/' },
  { name: 'featured-type', url: 'https://www.featuredtype.com/typefaces' },
  { name: 'dive-club', url: 'https://www.dive.club/' },
  { name: 'window-swap', url: 'https://www.window-swap.com/' },
  { name: 'fancy-components', url: 'https://www.fancycomponents.dev/docs/components/text/letter-swap' },
  { name: 'headless-ui', url: 'https://headlessui.com/' },
  { name: 'design-spells', url: 'https://www.designspells.com/' },
  { name: 'hyperframer', url: 'https://www.hyperframer.com/' },
];

const OUTPUT_DIR = path.join(__dirname, '../public/pic/inspirations');

async function generateScreenshots() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set viewport to a reasonable size for screenshots
  await page.setViewport({ width: 1280, height: 800 });

  for (const site of sites) {
    const outputPath = path.join(OUTPUT_DIR, `${site.name}.png`);

    console.log(`Taking screenshot of ${site.name} (${site.url})...`);

    try {
      await page.goto(site.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait a bit for any animations to settle
      await new Promise(resolve => setTimeout(resolve, 1000));

      await page.screenshot({
        path: outputPath,
        type: 'png',
      });

      console.log(`  ✓ Saved: ${outputPath}`);
    } catch (error) {
      console.error(`  ✗ Failed to screenshot ${site.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to:', OUTPUT_DIR);
}

generateScreenshots().catch(console.error);
