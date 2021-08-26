import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';

import CardBenchmark from '../../components/CardBenchmark';

describe('CardBenchmark', () => {
  it('should render the component', () => {
    const mockProps = {
      taskId: '',
      benchmark: {},
    };

    const wrapper = shallow(<CardBenchmark {...mockProps} />);
    expect(wrapper).toBeDefined();
  });
});
