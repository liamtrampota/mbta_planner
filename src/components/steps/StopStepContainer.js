import React from 'react';
import '../../styles/StepContainer.css';

 const StopStepContainer = ({ selectedStop, selectStop, stops }) => (
  <div>
    <h2 style={{ textAlign: 'center' }}>
      Select your stop
    </h2>
    { stops ?
      <StopStep stops={stops} selectedStop={selectedStop} selectStop={selectStop} />
      :
      <h4>
        Loading
      </h4>
    }
  </div>
)

const StopStep = ({ stops, selectedStop, selectStop }) => (
  <div className="stepContainer">
    {stops.map(stop => <Stop key={stop.id} stop={stop} selectedStop={selectedStop} selectStop={selectStop} />)}
  </div>
)

const Stop = ({ stop, selectedStop, selectStop }) => (
  <button style={{ display: 'flex', flexDirection:'column', alignItems: 'center', margin: '5px', width: '400px', backgroundColor: selectedStop && selectedStop.id===stop.id ? 'lightgreen' : '' }} onClick={()=>selectStop(stop)}>
    <h4 style={{marginBottom: '5px'}}>
      {stop.attributes.name}
    </h4>
    <p style={{marginTop: '5px'}}>
      {stop.attributes.address}
    </p>
  </button>
)

export default StopStepContainer;
