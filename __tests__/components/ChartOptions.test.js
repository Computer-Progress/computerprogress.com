import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import ChartOptions from '../../components/ChartOptions';

describe('ChartOptions', () => {
  it('should render the component', () => {
    const mockProps = {
      buttons: [
        {
          id: 0,
          name: 'Button 1',
        },
      ],
      selected: 0,
      title: 'Title 1',
      onPress: jest.fn(),
      secondTitle: 'Title 2',
      secondButtons: [
        {
          id: 1,
          name: 'Button 2',
        },
      ],
      onPressSecond: jest.fn(),
      selectedSecond: 0,
    };

    const wrapper = shallow(<ChartOptions {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
