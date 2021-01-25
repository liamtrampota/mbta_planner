import React from 'react';
import '../../styles/StepContainer.css';

const DepartureStepContainer = ({ predictedDepartureSchedule }) => (
  <div>
    <h3>
      Upcoming departure times
    </h3>
    <div className="stepContainer">
      { predictedDepartureSchedule.map(departureTime => (
        <DepartureTime key={departureTime} departureTime={departureTime} />
      ))}
    </div>
  </div>
)

const DepartureTime = ({ departureTime }) => (
  <div style={{ border: '1px solid black', padding: '5px', margin: '5px', width: '100px' }}>
    {new Date(departureTime.attributes.departure_time).toLocaleTimeString()}
  </div>
)

export default DepartureStepContainer;
