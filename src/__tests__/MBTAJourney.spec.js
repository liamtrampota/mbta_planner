import React from 'react';
import { shallow } from 'enzyme';
import MBTAJourney from '../components/MBTAJourney';
import * as api from '../api';

jest.mock('../api', () => ({
  getRoutes: jest.fn(),
  getStops: jest.fn(),
  getPredictedSchedule: jest.fn(),
  makeRequest: jest.fn(),
}))

beforeEach(() => {
  jest.restoreAllMocks();
})

describe('MBTAJourney', () => {
  test('renders MBTAJourney', () => {
    api.makeRequest.mockImplementationOnce(() => Promise.resolve({ data: [] }));
    const wrapper = shallow(<MBTAJourney/>);
    expect(wrapper).toMatchSnapshot();
  });
  test('componentWillMount', async () => {
    api.makeRequest.mockImplementationOnce(() => Promise.resolve({ data: 'routes' }));
    const makeRequestSpy = jest.spyOn(api, 'makeRequest');
    const wrapper = await shallow(<MBTAJourney/>);
    expect(makeRequestSpy).toHaveBeenCalledTimes(1);
    expect(makeRequestSpy).toHaveBeenCalledWith(api.getRoutes);
    wrapper.update();
    expect(wrapper.state().routes).toEqual('routes');
  });
  describe('selectData', () => {
    it('updates state with data at the step index', async () => {
      const mockSelectedRoute = { id: 'route1' };
      api.makeRequest.mockImplementationOnce(() => Promise.resolve({ data: 'stops' }));
      const makeRequestSpy = jest.spyOn(api, 'makeRequest');
      const wrapper = await shallow(<MBTAJourney/>);
      wrapper.find('#routeStep').invoke('selectRoute')(mockSelectedRoute);
      expect(wrapper.state().selectedStepData[0]).toEqual(mockSelectedRoute);
    });
  });
  describe('goToNextStep', () => {
    it('when step is 0 gets stops', async () => {
      const mockSelectedRoute = { id: 'route1' };
      const expectedStateStops = { route1: 'stops' };
      api.makeRequest.mockImplementation(() => Promise.resolve({ data: 'stops' }));
      const makeRequestSpy = jest.spyOn(api, 'makeRequest');
      const wrapper = await shallow(<MBTAJourney/>);
      wrapper.find('#routeStep').invoke('selectRoute')(mockSelectedRoute);
      await wrapper.find('#step0').props().goToNextStep();
      wrapper.update();
      expect(wrapper.state().stops).toEqual(expectedStateStops);
    });
    it('when step is 2 gets departure times', async () => {
      const mockSelectedRoute = { id: 'route1' };
      api.makeRequest.mockImplementation(() => Promise.resolve({ data: 'departureTimes' }));
      const makeRequestSpy = jest.spyOn(api, 'makeRequest');
      const wrapper = await shallow(<MBTAJourney/>);
      wrapper.setState({ step: 2, selectedStepData: [{ id: 'route1'}, {id: 'stop1'}, {directionId: 'direction1'}]})
      wrapper.update();
      await wrapper.find('#step2').props().goToNextStep();
      wrapper.update();
      expect(wrapper.state().predictedDepartureSchedule).toEqual('departureTimes');
    });
  });
});
