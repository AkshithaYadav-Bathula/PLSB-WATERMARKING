import React from 'react';
import './GenerateQR.css';

const GenerateQR = ({ uploadedImage, setGeneratedQR, setActiveStep }) => {
  const handleGenerateQR = () => {
    // Simulate QR generation
    // In a real application, you would generate an actual QR code here
    setTimeout(() => {
      // This would be your QR code generation logic
      const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOPSURBVO3BQW7sWAwEwZ7B/3/Z62OuBJCQZnbHExGx8B/EmCHGDDFmiDFDjBlivBzKp1RuUnmicpPKJyo3qTwxZogxQ4wZYswQ4+VQfknlCZU7VJ5Q+SWVJ8YMMWaIMUOMGWK8XKZyk8odKjepPKFyk8pvGTPEmCHGDDFmiPHyYSrvUHlC5Q6Vd6i8Y8wQY4YYM8SYIcbLh6n8TSpPqNyhcofKb1J5x5ghxgwxZogxQ4yXy1R+SeUOlSdUnlD5TSpPjBlivBxK7VA5qRwqJ5VD5VDZqRwqO5Wdyk5lp3KTyjtUdiqHylvGDDFmiDFDjBnyH6eyUzlUdio7lUNlp7JTOVQOlUPlDpWdyk7lUHnLmCHGDDFmiDHk5UOeUHlCZadyqNyhcqjsVHYqh8pOZadyqBwqO5UnxgwxZogxQ4wZcrxcplJTuUPlUKmp7FQOlZ3KTmWnslM5VA6VncrLmCHGDDFmiDFDXv7YE//JTuVQOVTeofLEmCHGDDFmiDHk+CKVm1QOlZ3KTmWnslM5VHYqO5Wdyk7lUNmp7FS+acwQY4YYM8SYIcfLh6ncpHKo7FR2KjuVncodKjuVJ1QOlZtUvmnMEGOGGDPEmCHHy2Uqh8qhslPZqdyk8g6Vm1R2KjepPDFmiDFDjBlivBwfpLJTOVR2KjuVQ+VQuUnlCZVDZadyqNyk8pYxQ4wZYswQY4a8/LAnVG5S2ansVG5S2am8ReVQuWPMEGOGGDPEmCHHy2UqN6kcKjuVQ+UOlZ3KTuUmlUPlUNmp7FS+acwQY4YYM8SYIcfLZSo7lTtUDpWdyk5lp3KovENlp3Ko7FR2KjuVncpNY4YYM8SYIcYMOV4+TOUmlUNlp3Ko7FQOlZ3KHSqHyk5lp7JTOVTeNWaIMUOMGWLMkOPlw1R2KjuVQ+VQuUPlULlDZadyqOxUDpVD5aaVf5gxQ4wZYswQ8h/2hMpO5VDZqRwqO5Wdyk7lULlJ5VDZqRwqO5Wdyk5lp/KuMUOMGWLMEGOGvPywD1I5VHYqO5Wdyk5lp7JT2ancpHKo7FQOlUPlpjFDjBlivBxKTeUmlZ3KTeVQOVR2KjuVnco3jRlizBBjhhgz5Hi5TOUmlUNlp7JT2ansVHYqh8pO5VB5QuVQ2an80pghxgwxZogxQ8SCGTHMEGOGGHPEGHPEGHPE+B9EvnX7VC7qLQAAAABJRU5ErkJggg==';
      setGeneratedQR(mockQRCode);
      setActiveStep(2);
    }, 1000);
  };

  return (
    <div className="generate-qr-container">
      {uploadedImage && (
        <>
          <div className="preview-image">
            <img src={uploadedImage} alt="Uploaded" />
          </div>
          <p>Your image has been uploaded successfully</p>
          <button onClick={handleGenerateQR}>Generate QR Code</button>
        </>
      )}
    </div>
  );
}

export default GenerateQR;