import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Circuit from '../../components/Circuit';

describe('Circuit', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Circuit />);
    expect(wrapper).toBeDefined();
  });
});
