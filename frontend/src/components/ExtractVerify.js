import React, { useState } from 'react';
import './ExtractVerify.css';

const ExtractVerify = ({ watermarkedImage }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  
  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      // In a real app, you'd extract and verify the watermark here
      setVerificationResult({
        success: true,
        message: 'Watermark successfully verified! The image is authentic.'
      });
      setIsVerifying(false);
    }, 2000);
  };
  
  return (
    <div className="extract-verify-container">
      {watermarkedImage && (
        <>
          <div className="watermarked-image-container">
            <h3>Watermarked Image</h3>
            <img src={watermarkedImage} alt="Watermarked" />
          </div>
          
          {!verificationResult ? (
            <button 
              onClick={handleVerify} 
              disabled={isVerifying}
              className={isVerifying ? 'loading' : ''}
            >
              {isVerifying ? 'Verifying...' : 'Extract & Verify Watermark'}
            </button>
          ) : (
            <div className={`verification-result ${verificationResult.success ? 'success' : 'failure'}`}>
              <div className="result-icon">
                {verificationResult.success ? '✓' : '✗'}
              </div>
              <p>{verificationResult.message}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExtractVerify;