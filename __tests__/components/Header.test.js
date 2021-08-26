import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Header from '../../components/Header';

describe('Header', () => {
  it('should render the component', () => {
    const mockProps = {
      isHome: true
    }
    const wrapper = shallow(<Header {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
