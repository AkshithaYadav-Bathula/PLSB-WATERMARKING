import React, { useState } from 'react';
import './App.css';
import StepIndicator from './components/StepIndicator';
import UploadImage from './components/UploadImage';
import GenerateQR from './components/GenerateQR';
import EmbedWatermark from './components/EmbedWatermark';
import ExtractVerify from './components/ExtractVerify';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedQR, setGeneratedQR] = useState(null);
  const [watermarkedImage, setWatermarkedImage] = useState(null);

  const steps = [
    { title: 'Upload Image', component: <UploadImage setUploadedImage={setUploadedImage} setActiveStep={setActiveStep} /> },
    { title: 'Generate QR', component: <GenerateQR uploadedImage={uploadedImage} setGeneratedQR={setGeneratedQR} setActiveStep={setActiveStep} /> },
    { title: 'Embed Watermark', component: <EmbedWatermark uploadedImage={uploadedImage} generatedQR={generatedQR} setWatermarkedImage={setWatermarkedImage} setActiveStep={setActiveStep} /> },
    { title: 'Extract & Verify', component: <ExtractVerify watermarkedImage={watermarkedImage} /> }
  ];

  return (
    <div className="App">
      <h1>Image Watermarking System</h1>
      <StepIndicator steps={steps.map(step => step.title)} activeStep={activeStep} />
      <div className="content-container">
        {steps[activeStep].component}
      </div>
    </div>
  );
}

export default App;