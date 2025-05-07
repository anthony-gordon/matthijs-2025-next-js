import { get } from 'https';
import sharp from 'sharp'; // You'll need to install: npm install sharp

export async function getImageDimensionsFromUrl(url) {
  try {
    // Download the image to a buffer
    const imageBuffer = await new Promise((resolve, reject) => {
      let data = [];
      get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          resolve(Buffer.concat(data));
        });
      }).on('error', reject);
    });

    // Use sharp to get the metadata
    const metadata = await sharp(imageBuffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format
    };
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return null;
  }
}
