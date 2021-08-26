import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import TaskTableSOTA from '../../components/TaskTableSOTA';

describe('TaskTableSOTA', () => {
  it('should render the component', () => {
    const mockProps = {
      sota: {},
    };
    const wrapper = shallow(<TaskTableSOTA {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
