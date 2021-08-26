import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import Footer from '../../components/Footer';
import FooterWave from '../../components/FooterWave';

describe('Footer', () => {
  it('should render the component with its props', () => {
    const mockProps = {
      isHome: true,
    };

    const wrapper = shallow(<Footer {...mockProps} />);
    expect(wrapper).toBeDefined();
  });

  it('should render the component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeDefined();
  });
});

describe('Footer Wave', () => {
  it('should render the component', () => {
    const wrapper = shallow(<FooterWave />);
    expect(wrapper).toBeDefined();
  });
});
