/**
 * Icon Generation Script
 * 
 * Generates PNG icons from SVG source for PWA and favicon support.
 * Run with: node scripts/generate-icons.mjs
 */

import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '../public/icons');

// Icon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'icon-48x48.png', size: 48 },
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-128x128.png', size: 128 },
  { name: 'icon-144x144.png', size: 144 },
  { name: 'icon-152x152.png', size: 152 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateIcons() {
  // Read the SVG source
  const svgPath = path.join(iconsDir, 'icon-512x512.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  console.log('Generating PNG icons from SVG...\n');

  for (const { name, size } of sizes) {
    try {
      // Render SVG to PNG at specified size
      const resvg = new Resvg(svgContent, {
        fitTo: {
          mode: 'width',
          value: size,
        },
      });
      
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      
      const outputPath = path.join(iconsDir, name);
      fs.writeFileSync(outputPath, pngBuffer);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('\n✓ Icon generation complete!');
  console.log('\nGenerated files:');
  fs.readdirSync(iconsDir).forEach(file => {
    const stats = fs.statSync(path.join(iconsDir, file));
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

generateIcons().catch(console.error);
