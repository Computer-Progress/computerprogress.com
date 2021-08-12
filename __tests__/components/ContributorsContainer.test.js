import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import ContributorsContainer from '../../components/ContributorsContainer';

describe('ContributorsContainer', () => {
  it('should render the component', () => {
    const mockProps = {
      researchers: [
        {
          name: 'Name 1',
          workPlace: 'Place 1',
          position: 'Position 1',
          imageName: 'Image 1',
        },
      ],
      otherContributors: [
        {
          name: 'Name 2',
          workPlace: 'Place 2',
          position: 'Position 2',
          imageName: 'Image 2',
        },
      ],
    };
    const wrapper = shallow(<ContributorsContainer {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
