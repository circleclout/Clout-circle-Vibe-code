const sharp = require('sharp');

async function processImage() {
  const input = './public/logo.png';
  const output = './public/logo_transparent.png';

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    // Brightness mapped to alpha
    const brightness = (r + g + b) / 3;
    
    data[i] = 255;
    data[i+1] = 255;
    data[i+2] = 255;
    data[i+3] = Math.round(brightness);
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .png()
  .toFile(output);
  
  console.log('Background removed successfully!');
}

processImage().catch(console.error);
