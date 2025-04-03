import React, { useState } from 'react';
import './EmbedWatermark.css';

const EmbedWatermark = ({ uploadedImage, generatedQR, setWatermarkedImage, setActiveStep }) => {
  const [isEmbedding, setIsEmbedding] = useState(false);
  
  const handleEmbedWatermark = () => {
    setIsEmbedding(true);
    
    // Simulate watermark embedding process
    setTimeout(() => {
      // In a real app, you would process the image and QR code here
      // For now, we'll just use the original image as the "watermarked" version
      setWatermarkedImage(uploadedImage);
      setIsEmbedding(false);
      setActiveStep(3);
    }, 2000);
  };
  
  return (
    <div className="embed-watermark-container">
      {uploadedImage && generatedQR && (
        <>
          <div className="image-preview-container">
            <div className="image-preview">
              <h3>Original Image</h3>
              <img src={uploadedImage} alt="Original" />
            </div>
            <div className="image-preview">
              <h3>QR Code</h3>
              <img src={generatedQR} alt="QR Code" className="qr-image" />
            </div>
          </div>
          <button 
            onClick={handleEmbedWatermark} 
            disabled={isEmbedding}
            className={isEmbedding ? 'loading' : ''}
          >
            {isEmbedding ? 'Embedding Watermark...' : 'Embed Watermark'}
          </button>
        </>
      )}
    </div>
  );
}

export default EmbedWatermark;