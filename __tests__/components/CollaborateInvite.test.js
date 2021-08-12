import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import CollaborateInvite from '../../components/CollaborateInvite';

describe('CollaborateInvite', () => {
  it('should render the component', () => {
    const wrapper = shallow(<CollaborateInvite />);
    expect(wrapper).toBeDefined();
  });
});
