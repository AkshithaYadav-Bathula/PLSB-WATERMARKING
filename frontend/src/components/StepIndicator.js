import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ steps, activeStep }) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={index} className="step-item">
          <div className={`step-circle ${index === activeStep ? 'active' : index < activeStep ? 'completed' : ''}`}>
            {index + 1}
          </div>
          <div className="step-title">{step}</div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;