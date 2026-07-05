const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function compressVideos() {
  console.log('Using ffmpeg at:', ffmpeg);
  const vidsDir = path.join(__dirname, 'public', 'vids');
  
  const files = ['vid1.mp4', 'vid2.mp4'];
  
  for (const file of files) {
    const inputPath = path.join(vidsDir, file);
    const outputPath = path.join(vidsDir, `compressed_${file}`);
    
    if (fs.existsSync(inputPath)) {
      console.log(`Compressing ${file}...`);
      // -vcodec libx264 : standard video codec
      // -crf 28 : higher number = more compression, lower quality (good for background videos)
      // -preset fast : fast encoding
      // -vf scale=-2:720 : scale to 720p height, keep aspect ratio
      // -an : remove audio track (since it's a muted background video)
      
      const cmd = `"${ffmpeg}" -i "${inputPath}" -vcodec libx264 -crf 28 -preset fast -vf scale=-2:720 -an -y "${outputPath}"`;
      try {
        execSync(cmd, { stdio: 'inherit' });
        
        // Replace original with compressed
        fs.renameSync(outputPath, inputPath);
        console.log(`Successfully compressed ${file}!`);
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err.message);
      }
    }
  }
}

compressVideos();
