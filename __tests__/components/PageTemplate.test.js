import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import PageTemplate from '../../components/PageTemplate';

describe('PageTemplate', () => {
  it('should render the component', () => {
    const mockProps = {
      isHome: true,
      ignoreContainer: true,
      children: jest.fn(),
    };
    const wrapper = shallow(<PageTemplate {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
