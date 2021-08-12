import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Collaborate from '../../components/Collaborate';

describe('Collaborate', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Collaborate />);
    expect(wrapper).toBeDefined();
  });
});
