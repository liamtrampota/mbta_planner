import React from 'react';
import { shallow } from 'enzyme';
import DepartureStepContainer from '../../components/steps/DepartureStepContainer';

const props = { predictedDepartureSchedule: [{ attributes: {departure_time: 'Sun Jan 24 2021 23:27:07 GMT-0500 (Eastern Standard Time)' }}]}

describe('DepartureStepContainer', () => {
  test('renders DepartureStepContainer', () => {
    const wrapper = shallow(<DepartureStepContainer {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
