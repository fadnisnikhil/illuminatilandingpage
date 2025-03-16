const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  const dirPath = path.join(__dirname, '..', 'public', directory);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

// Generate a placeholder image with text
function generatePlaceholderImage(width, height, text, backgroundColor, textColor) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${Math.floor(width / 15)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toBuffer('image/jpeg');
}

// Image configuration
const images = [
  { dir: '', name: 'logo.png', width: 180, height: 60, text: 'Illuminati Logo', color: '#10b981' },
  { dir: '', name: 'hero-bg.jpg', width: 1920, height: 1080, text: 'Hero Background', color: '#111111' },
  
  // Products
  ...['original', 'zero-sugar', 'berry-blast', 'tropical-surge'].flatMap(product => [
    { dir: 'products', name: `${product}.jpg`, width: 600, height: 800, text: `${product.replace('-', ' ')}`, color: '#1f2937' },
    { dir: 'products', name: `${product}-2.jpg`, width: 600, height: 800, text: `${product.replace('-', ' ')} 2`, color: '#1f2937' },
    { dir: 'products', name: `${product}-3.jpg`, width: 600, height: 800, text: `${product.replace('-', ' ')} 3`, color: '#1f2937' },
  ]),
  
  // Lifestyle
  { dir: 'lifestyle', name: 'lifestyle-hero.jpg', width: 1920, height: 1080, text: 'Lifestyle Hero', color: '#111111' },
  ...['event', 'sports', 'nightlife'].flatMap((type, i) => [
    { dir: 'lifestyle', name: `${type}-1.jpg`, width: 800, height: 600, text: `${type} 1`, color: '#1e293b' },
    { dir: 'lifestyle', name: `${type}-2.jpg`, width: 800, height: 600, text: `${type} 2`, color: '#1e293b' },
    { dir: 'lifestyle', name: `${type}-3.jpg`, width: 800, height: 600, text: `${type} 3`, color: '#1e293b' },
  ]),
  
  // Brand Story
  { dir: 'brand-story', name: 'hero.jpg', width: 1920, height: 1080, text: 'Brand Story Hero', color: '#111111' },
  { dir: 'brand-story', name: 'founder.jpg', width: 800, height: 600, text: 'Founder', color: '#1e293b' },
  ...['inception', 'formula', 'launch', 'expansion', 'global', 'innovation'].map(item => (
    { dir: 'brand-story', name: `${item}.jpg`, width: 800, height: 600, text: item, color: '#1e293b' }
  )),
  
  // Innovation
  { dir: 'innovation', name: 'innovation-hero.jpg', width: 1920, height: 1080, text: 'Innovation Hero', color: '#111111' },
  { dir: 'innovation', name: 'manufacturing-map.jpg', width: 1200, height: 800, text: 'Manufacturing Map', color: '#1e293b' },
  { dir: 'innovation', name: 'science.jpg', width: 800, height: 600, text: 'Science', color: '#1e293b' },
  ...['ingredients', 'mixing', 'testing', 'packaging'].map(item => (
    { dir: 'innovation', name: `${item}.jpg`, width: 600, height: 400, text: item, color: '#1e293b' }
  )),
  
  // Blogs
  ...['caffeine', 'workout', 'brain', 'zero-sugar', 'festival', 'athlete'].map(item => (
    { dir: 'blogs', name: `${item}.jpg`, width: 1200, height: 800, text: item, color: '#1e293b' }
  )),
  { dir: 'blogs', name: 'caffeine-comparison.jpg', width: 1200, height: 600, text: 'Caffeine Comparison', color: '#1e293b' },
  
  // Contact
  { dir: 'contact', name: 'contact-hero.jpg', width: 1920, height: 1080, text: 'Contact Hero', color: '#111111' },
  { dir: 'contact', name: 'map.jpg', width: 1200, height: 600, text: 'Map', color: '#1e293b' },
  
  // Team
  { dir: 'team', name: 'alexandra-chen.jpg', width: 400, height: 400, text: 'Dr. Chen', color: '#1e293b' },
  { dir: 'team', name: 'default-avatar.jpg', width: 400, height: 400, text: 'Avatar', color: '#1e293b' },
  
  // Instagram
  ...[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
    { dir: 'instagram', name: `${num}.jpg`, width: 400, height: 400, text: `Instagram ${num}`, color: '#1e293b' }
  )),
];

// Generate all images
images.forEach(img => {
  const dir = ensureDirectoryExists(img.dir);
  const filePath = path.join(dir, img.name);
  
  // Skip if the file already exists
  if (!fs.existsSync(filePath)) {
    const imageData = generatePlaceholderImage(
      img.width, 
      img.height, 
      img.text, 
      img.color || '#1e293b', 
      '#ffffff'
    );
    
    fs.writeFileSync(filePath, imageData);
    console.log(`Generated: ${img.dir}/${img.name}`);
  } else {
    console.log(`Skipped (already exists): ${img.dir}/${img.name}`);
  }
});

console.log('All placeholder images have been generated.'); 