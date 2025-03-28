const fs = require('fs');
const { exec } = require('child_process');

// Create dist directory if it doesn't exist
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

// Run PostCSS processing
exec('npx postcss ./styles/main.css -o ./dist/output.css', (error) => {
  if (error) {
    console.error('Build failed:', error);
    return;
  }
  console.log('CSS built successfully!');
});