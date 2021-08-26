import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Home from '../../containers/Home';

describe('Home', () => {
  it('should render the component', () => {
    const mockProps = {
      tasks: [],
    };
    const wrapper = shallow(<Home {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
