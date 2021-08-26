import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import SignIn from '../../containers/SignIn';

describe('SignIn', () => {
  it('should render the component', () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper).toBeDefined();
  });
});
