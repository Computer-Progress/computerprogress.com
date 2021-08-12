import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import ContributorCard from '../../components/ContributorCard';

describe('ContributorCard', () => {
  it('should render the component', () => {
    const mockProps = {
      contributor: {
        name: '',
        workPlace: '',
        position: '',
        imageName: '',
      }
    }
    const wrapper = shallow(<ContributorCard {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
