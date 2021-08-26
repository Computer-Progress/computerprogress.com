import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Button from '../../components/Button';

describe('Button', () => {
  it('should render the component with value link props equal true', () => {
    const mockProps = {
      link: true,
      primary: true,
      children: jest.fn(),
    };
    const wrapper = shallow(<Button {...mockProps} />);
    expect(wrapper).toBeDefined();
  });

  it('should render the component with value link props equal false', () => {
    const mockProps = {
      link: false,
      primary: true,
      children: jest.fn(),
    };
    const wrapper = shallow(<Button {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
