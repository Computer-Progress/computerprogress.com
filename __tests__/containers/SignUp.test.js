import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import SignUp from '../../containers/SignUp';

describe('SignUp', () => {
  it('should render the component', () => {
    const mockProps = {
      tasks: [],
    };
    const wrapper = shallow(<SignUp {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
