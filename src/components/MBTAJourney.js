import React from 'react';
import '../styles/MTAJourney.css';
import * as api from '../api';
import StepContainer from './StepContainer';
import DepartureStepContainer from './steps/DepartureStepContainer';
import DirectionStepContainer from './steps/DirectionStepContainer';
import RouteStepContainer from './steps/RouteStepContainer';
import StopStepContainer from './steps/StopStepContainer';

export default class MBTAJourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      routes: null,
      stops: {},
      selectedStepData: [null, null, null],
      predictedDepartureSchedule: [],
    }
  }

  componentWillMount = () => {
    this.getRoutes();
  }

  getRoutes = () => {
    api.makeRequest(api.getRoutes)
    .then((response) => {
      this.setState({ routes: response.data })
    })
    .catch((e) => {
      console.log('getRoutes e:', e);
    })
  }

  getStops = () => {
    const { stops, selectedStepData } = this.state;
    const selectedRouteId = selectedStepData[0].id;
    if(!stops[selectedRouteId]) {
      api.makeRequest(api.getStops, selectedRouteId)
      .then((response) => {
        stops[selectedRouteId] = response.data;
        this.setState({ stops })
      })
      .catch((e) => {
        console.log('getStops e:', e);
      })
    }
  }

  getDepartureTime = () => {
    const { selectedStepData } = this.state;
    const selectedRouteId = selectedStepData[0].id;
    const selectedStopId = selectedStepData[1].id;
    const selectedDirectionId = selectedStepData[2].directionId;
    api.makeRequest(api.getPredictedSchedule, selectedDirectionId, selectedRouteId, selectedStopId)
    .then((response) => {
      this.setState({ predictedDepartureSchedule: response.data })
    })
    .catch((e) => {
      console.log('getDepartureTime e:', e);
    })
  }

  selectData = (data) => {
    const updatedSelectedStepData = this.state.selectedStepData.slice();
    updatedSelectedStepData[this.state.step] = data;
    this.setState({ selectedStepData: updatedSelectedStepData });
  }

  goToNextStep = () => {
    if(this.state.step === 0){
      this.getStops();
    }
    if(this.state.step === 2){
      this.getDepartureTime();
    }
    this.setState({ step: this.state.step+1 });
  }

  goToPreviousStep = () => {
    const { selectedStepData, step } = this.state;
    if(step === 3){
      this.setState({ predictedDepartureSchedule: [], step: step-1 })
      return;
    }
    const updatedSelectedStepData = selectedStepData.slice();
    updatedSelectedStepData[step] = null;
    this.setState({ step: step-1, selectedStepData: updatedSelectedStepData });
  }

  render() {
    const { step, routes, stops, selectedStepData, predictedDepartureSchedule } = this.state;
    const selectedRoute = selectedStepData[0];
    const selectedStop = selectedStepData[1];
    const selectedDirection = selectedStepData[2];
    return (
      <div className='container'>
        <h1>Numerated MBTA Trip Planner</h1>
        <div>
          <h2>
            <span style={{color: step >= 0 ? selectedRoute ? 'green' : 'orange' : 'black'}}>Route</span>
            <span> -> </span>
            <span style={{color: step >= 1 ? selectedStop ? 'green' : 'orange' : 'black'}}>Stop</span>
            <span> -> </span>
            <span style={{color: step >= 2 ? selectedDirection ? 'green' : 'orange' : 'black'}}>Direction</span>
            <span> -> </span>
            <span style={{color: step >= 3 ? 'green' : 'black'}}>Schedule</span>
          </h2>
        </div>
        { step === 0 &&
          <StepContainer id="step0" stepIndex={0} nextStepEnabled={selectedRoute} goToNextStep={this.goToNextStep} goToPreviousStep={this.goToPreviousStep}>
            <RouteStepContainer
              id="routeStep"
              routes={routes}
              selectRoute={this.selectData}
              selectedRoute={selectedRoute}
            />
          </StepContainer>
        }
        { step === 1 &&
          <StepContainer stepIndex={1} nextStepEnabled={selectedStop} goToNextStep={this.goToNextStep} goToPreviousStep={this.goToPreviousStep}>
            <StopStepContainer
              stops={stops[selectedRoute.id]}
              selectStop={this.selectData}
              selectedStop={selectedStop}
            />
          </StepContainer>
        }
        { step === 2 &&
          <StepContainer id="step2" stepIndex={2} nextStepEnabled={selectedDirection} goToNextStep={this.goToNextStep} goToPreviousStep={this.goToPreviousStep}>
            <DirectionStepContainer
              selectDirection={this.selectData}
              selectedRoute={selectedRoute}
              selectedDirection={selectedDirection}
            />
          </StepContainer>
        }
        { step === 3 &&
          <StepContainer stepIndex={3} goToNextStep={this.goToNextStep} goToPreviousStep={this.goToPreviousStep}>
            <DepartureStepContainer
              predictedDepartureSchedule={predictedDepartureSchedule}
            />
          </StepContainer>
        }
      </div>
    )
  }
}
