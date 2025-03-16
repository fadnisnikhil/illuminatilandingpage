const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const directories = [
  'public/instagram',
  'public/icons',
  'public/products',
  'public/lifestyle',
  'public/brand-story',
  'public/innovation',
  'public/blogs',
  'public/contact',
  'public/team'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create placeholder SVG icons
const icons = [
  { name: 'quality.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M14 18l-4-4 1.4-1.4L14 15.2l6.6-6.6L22 10l-8 8z" fill="black"/></svg>' },
  { name: 'innovation.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M16 7v10m-5-5h10" stroke="black" stroke-width="2"/></svg>' },
  { name: 'community.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><circle cx="12" cy="12" r="3" fill="black"/><circle cx="20" cy="12" r="3" fill="black"/><circle cx="16" cy="20" r="3" fill="black"/></svg>' },
  { name: 'lifestyle.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M10 10h12v12H10z" fill="black"/></svg>' },
  { name: 'battery.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M10 12h12v8H10z" fill="black"/><path d="M23 14v4h2v-4h-2z" fill="black"/></svg>' },
  { name: 'nutrition.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M12 8v16M20 8v16" stroke="black" stroke-width="2"/></svg>' },
  { name: 'brain.svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#10b981"/><path d="M16 8c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" fill="black"/></svg>' }
];

icons.forEach(icon => {
  const iconPath = path.join('public/icons', icon.name);
  fs.writeFileSync(iconPath, icon.content);
  console.log(`Created icon: ${iconPath}`);
});

// Create placeholder images (as blank colored SVGs)
const imgSizes = [
  { dir: 'instagram', count: 8, width: 400, height: 400, color: '#1e293b' },
  { dir: 'products', files: ['original.jpg', 'zero-sugar.jpg', 'berry-blast.jpg', 'tropical-surge.jpg'], width: 600, height: 800, color: '#1f2937' },
  { dir: 'hero-bg.jpg', width: 1920, height: 1080, color: '#0f172a' }
];

// Function to create SVG placeholder
function createSvgPlaceholder(width, height, color, text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${color}"/>
    <text x="${width/2}" y="${height/2}" font-family="Arial" font-size="${width/15}" fill="white" text-anchor="middle">${text}</text>
  </svg>`;
}

// Create Instagram placeholders
for (let i = 1; i <= 8; i++) {
  const imgPath = path.join('public/instagram', `${i}.jpg`);
  const svg = createSvgPlaceholder(400, 400, '#1e293b', `Instagram ${i}`);
  fs.writeFileSync(imgPath, svg);
  console.log(`Created image: ${imgPath}`);
}

// Create hero image
fs.writeFileSync('public/hero-bg.jpg', createSvgPlaceholder(1920, 1080, '#0f172a', 'Hero Background'));
console.log('Created image: public/hero-bg.jpg');

console.log('All placeholder assets have been created!'); 