import React from 'react';
import '../../styles/StepContainer.css';

const RouteStepContainer = ({ selectRoute, selectedRoute, routes }) => (
  <div>
    <h2 style={{ textAlign: 'center' }}>
      Select your route
    </h2>
    { routes ?
      <RouteStep routes={routes} selectRoute={selectRoute} selectedRoute={selectedRoute} />
      :
      <h4>
        Loading
      </h4>
    }
  </div>
)

const RouteStep = ({ routes, selectRoute, selectedRoute }) => (
  <div className="stepContainer">
    {routes.map(route => <Route key={route.id} route={route} selectRoute={selectRoute} selectedRoute={selectedRoute} />)}
  </div>
)

const Route = ({ route, selectRoute, selectedRoute }) => (
  <button style={{ display: 'flex', alignItems: 'center', margin: '5px', minWidth: '150px', backgroundColor: selectedRoute && selectedRoute.id===route.id ? 'lightgreen' : '' }} onClick={()=>selectRoute(route)}>
    <div style={{ height: '10px', width: '10px', marginRight: '10px', backgroundColor: `#${route.attributes.color}`}}/>
    <h4>
      {route.attributes.long_name}
    </h4>
  </button>
)

export default RouteStepContainer;
