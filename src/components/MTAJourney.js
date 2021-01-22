import React from 'react';
import '../styles/MTAJourney.css';
import DepartureStepContainer from './steps/DepartureStepContainer';
import DirectionStepContainer from './steps/DirectionStepContainer';
import RouteStepContainer from './steps/RouteStepContainer';
import StopStepContainer from './steps/StopStepContainer';

const steps = [ 'route', 'stop', 'direction', 'departure' ];

export default class MTAJourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: steps[0]
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div className='container'>
        <h1>MTA Journey</h1>
        { step === 'route' &&
          <RouteStepContainer />
        }
        { step === 'stop' &&
          <StopStepContainer />
        }
        { step === 'direction' &&
          <DirectionStepContainer />
        }
        { step === 'departure' &&
          <DepartureStepContainer />
        }
      </div>
    )
  }
}
