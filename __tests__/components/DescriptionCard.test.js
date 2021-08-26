import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import DescriptionCard from '../../components/DescriptionCard';

describe('DescriptionCard', () => {
  it('should render the component', () => {
    const mockProps = {
      icon: '',
      title: '',
      description: '',
      isH1: '',
      imageBorder: '',
    }
    const wrapper = shallow(<DescriptionCard {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
