import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const publicDir = resolve('./public');
const distDir = resolve('./dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy background image
try {
  copyFileSync(
    resolve(publicDir, 'background-image.avif'),
    resolve(distDir, 'background-image.avif')
  );
  console.log('Background image copied successfully');
} catch (error) {
  console.error('Error copying background image:', error);
}

// Copy background music
try {
  copyFileSync(
    resolve(publicDir, 'background-music.mp3'),
    resolve(distDir, 'background-music.mp3')
  );
  console.log('Background music copied successfully');
} catch (error) {
  console.error('Error copying background music:', error);
}