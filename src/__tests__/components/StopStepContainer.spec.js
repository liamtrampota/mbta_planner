import React from 'react';
import { shallow } from 'enzyme';
import StopStepContainer from '../../components/steps/StopStepContainer';

const props = {
  selectStop: jest.fn(),
  stops: [{ id: '1', attributes: { name: 'Ashmont', address: '21 Just Road'} }]
}
describe('StopStepContainer', () => {
  test('renders StopStepContainer', () => {
    const wrapper = shallow(<StopStepContainer {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
