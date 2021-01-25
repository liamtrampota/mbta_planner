import React from 'react';
import { shallow } from 'enzyme';
import RouteStepContainer from '../../components/steps/RouteStepContainer';

const props = {
  selectRoute: jest.fn(),
  selectedRoute: { attributes: { direction_names: ["South", "North"], direction_destinations: ["Ashmont", "Montclair"] }},
  routes: [{ id: '1', attributes: { long_name: 'Red'} }]
}

describe('RouteStepContainer', () => {
  test('renders RouteStepContainer', () => {
    const wrapper = shallow(<RouteStepContainer {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
