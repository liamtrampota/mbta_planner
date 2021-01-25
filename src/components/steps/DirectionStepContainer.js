import React from 'react';
import '../../styles/StepContainer.css';

const getDirectionsFromRoute = (selectedRoute) => {
  const directions = [];
  selectedRoute.attributes.direction_names.forEach((directionName, index) => {
    const direction = {name: directionName, destination: selectedRoute.attributes.direction_destinations[index]};
    directions.push(direction)
  })
  return directions;
}

const DirectionStepContainer = ({ selectedRoute, selectDirection, selectedDirection }) => {
  const directions = getDirectionsFromRoute(selectedRoute);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        Select which direction you are travelling
      </h2>
      <DirectionStep directions={directions} selectDirection={selectDirection} selectedDirection={selectedDirection} />
    </div>
  )
}


const DirectionStep = ({ directions, selectDirection, selectedDirection }) => (
  <div className="stepContainer">
    {directions.map((direction, index) => <Direction key={direction.name} direction={direction} selectDirection={selectDirection} index={index} selectedDirection={selectedDirection} />)}
  </div>
)

const Direction = ({ direction, selectDirection, index, selectedDirection }) => (
  <button style={{ display: 'flex', flexDirection:'column', alignItems: 'center', margin: '5px', width: '400px', backgroundColor: selectedDirection && selectedDirection.directionId === index ? 'lightgreen' : ''  }} onClick={()=>selectDirection({ directionId: index})}>
    <h4 style={{marginBottom: '5px'}}>
      {direction.name}
    </h4>
    <p style={{marginTop: '5px'}}>
      {direction.destination}
    </p>
  </button>
)

export default DirectionStepContainer;
