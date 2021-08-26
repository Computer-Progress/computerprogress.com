import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import AboutUs from '../../containers/AboutUs';

describe('AboutUs', () => {
  it('should render the component', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper).toBeDefined();
  });
});
