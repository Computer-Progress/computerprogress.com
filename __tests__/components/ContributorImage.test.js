import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import ContributorImage from '../../components/ContributorImage';

describe('ContributorImage', () => {
  it('should render the component', () => {
    const mockProps = '';
    const wrapper = shallow(<ContributorImage {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
