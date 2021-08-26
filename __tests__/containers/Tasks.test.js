import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Tasks from '../../containers/Tasks';

describe('Tasks', () => {
  it('should render the component', () => {
    const mockProps = {
      tasks: [
        {
          id: 1,
          identifier: '',
          image: '',
          description: '',
        },
      ],
    };
    const wrapper = shallow(<Tasks {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
