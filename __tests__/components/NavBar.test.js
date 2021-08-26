import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import NavBar from '../../components/NavBar';

describe('NavBar', () => {
  it('should render the component', () => {
    const mockProps = {
      transparentBackground: true,
    };
    const wrapper = shallow(<NavBar {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
