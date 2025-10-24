const fs = require('fs');

try {
  const content = fs.readFileSync('vercel.json', 'utf8');
  const parsed = JSON.parse(content);
  console.log('✅ vercel.json is valid JSON');
  console.log('✅ File has', Object.keys(parsed).length, 'top-level properties');
  console.log('✅ Builds count:', parsed.builds.length);
  console.log('✅ Routes count:', parsed.routes.length);
} catch (error) {
  console.log('❌ Error validating vercel.json:', error.message);
}