import React from 'react';
import { shallow } from 'enzyme';
import DirectionStepContainer from '../../components/steps/DirectionStepContainer';

const props = {
  selectedRoute: { attributes: { direction_names: ["South", "North"], direction_destinations: ["Ashmont", "Montclair"] }},
  selectDirection: jest.fn(),
  selectedDirection: { directionId: 0 }
}

describe('DirectionStepContainer', () => {
  test('renders DirectionStepContainer', () => {
    const wrapper = shallow(<DirectionStepContainer {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
