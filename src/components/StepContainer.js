import React from 'react';

const StepContainer = ({ stepIndex, children, nextStepEnabled, goToNextStep, goToPreviousStep }) => (
  <div className="stepContainer">
    {children}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
      {stepIndex > 0 &&
        <button style={{ marginRight: '10px' }} onClick={goToPreviousStep}>
          Previous Step
        </button>
      }
      {stepIndex < 3 &&
        <button disabled={!nextStepEnabled} onClick={goToNextStep}>
          Next Step
        </button>
      }
    </div>
  </div>
)

export default StepContainer;
