const fs = require('fs-extra');
const path = require('path');
const Jimp = require('jimp');
const QRCode = require('qrcode');
const axios = require('axios');

/**
 * Simplified face detection using Jimp
 * Note: This is a very basic approximation since we can't use MTCNN in Node.js easily
 * For production, you might want to use a face detection API or a more sophisticated approach
 */
exports.detectFace = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    
    // Simplified detection - for full functionality, consider using:
    // 1. A cloud API like AWS Rekognition or Google Vision API
    // 2. A Node.js face detection library like face-api.js (requires canvas)
    
    // For now, we'll assume the top 25% of the image might contain a face
    const width = image.getWidth();
    const height = image.getHeight();
    
    // Just an approximation for demonstration - not actual face detection
    const faceBox = {
      x: Math.floor(width * 0.25),
      y: Math.floor(height * 0.1),
      width: Math.floor(width * 0.5),
      height: Math.floor(height * 0.3)
    };
    
    return {
      hasFace: true, // We're assuming there's a face
      faceBox: faceBox
    };
  } catch (error) {
    console.error('Error detecting face:', error);
    return {
      hasFace: false,
      faceBox: null
    };
  }
};

/**
 * Embed watermark using a simple LSB technique
 */
exports.embedWatermark = async (imagePath, qrPath, outputPath) => {
  try {
    // Read the original image and QR code
    const [originalImage, qrImage] = await Promise.all([
      Jimp.read(imagePath),
      Jimp.read(qrPath)
    ]);
    
    // Get image dimensions
    const width = originalImage.getWidth();
    const height = originalImage.getHeight();
    
    // Determine body region (below the face)
    // Assuming face is in top 25% for simplicity
    const bodyStartY = Math.floor(height * 0.4); // Start after face region
    
    // Resize QR code to fit body region width, maintaining aspect ratio
    const bodyHeight = height - bodyStartY;
    const qrResized = qrImage.resize(width, bodyHeight);
    
    // Create copy of original image
    const watermarkedImage = originalImage.clone();
    
    // Embed QR in the penultimate LSB of each RGB channel in the body region
    for (let y = bodyStartY; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const qrY = y - bodyStartY;
        
        // Get original pixel color
        const originalPixel = Jimp.intToRGBA(originalImage.getPixelColor(x, y));
        
        // Get QR pixel color (black/white)
        const qrPixel = Jimp.intToRGBA(qrResized.getPixelColor(x, qrY));
        const qrBit = qrPixel.r > 128 ? 1 : 0; // 1 for white, 0 for black
        
        // Modify RGB values - embed in 2nd least significant bit
        const newR = (originalPixel.r & 0xFD) | (qrBit << 1);
        const newG = (originalPixel.g & 0xFD) | (qrBit << 1);
        const newB = (originalPixel.b & 0xFD) | (qrBit << 1);
        
        // Set the new pixel color
        const newColor = Jimp.rgbaToInt(newR, newG, newB, originalPixel.a);
        watermarkedImage.setPixelColor(newColor, x, y);
      }
    }
    
    // Save watermarked image
    await watermarkedImage.writeAsync(outputPath);
    return true;
  } catch (error) {
    console.error('Error embedding watermark:', error);
    return false;
  }
};

/**
 * Extract watermark from the watermarked image
 */
exports.extractWatermark = async (watermarkedPath, outputPath) => {
  try {
    // Read the watermarked image
    const watermarkedImage = await Jimp.read(watermarkedPath);
    
    // Get image dimensions
    const width = watermarkedImage.getWidth();
    const height = watermarkedImage.getHeight();
    
    // Determine body region (below the face)
    const bodyStartY = Math.floor(height * 0.4);
    const bodyHeight = height - bodyStartY;
    
    // Create a new image for the extracted QR code
    const extractedQR = new Jimp(width, bodyHeight, 0xFFFFFFFF); // White background
    
    // Extract QR from the 2nd least significant bit
    for (let y = bodyStartY; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = Jimp.intToRGBA(watermarkedImage.getPixelColor(x, y));
        
        // Extract bit from the 2nd LSB
        const bit = (pixel.r & 0x02) >> 1;
        
        // Create black or white pixel
        const qrColor = bit ? 0xFFFFFFFF : 0x000000FF;
        extractedQR.setPixelColor(qrColor, x, y - bodyStartY);
      }
    }
    
    // Save extracted QR
    await extractedQR.writeAsync(outputPath);
    return true;
  } catch (error) {
    console.error('Error extracting watermark:', error);
    return false;
  }
};

/**
 * Read QR code and return the data
 */
exports.readQRCode = async (qrPath) => {
  try {
    // For production, you would use a library like jsQR to read the QR code
    // For simplicity, we'll return a mock value (the file path, which is unique)
    // In a real implementation, you'd need to decode the QR image
    
    return qrPath; // Mock return value - in production use actual QR code reading
  } catch (error) {
    console.error('Error reading QR code:', error);
    return null;
  }
};