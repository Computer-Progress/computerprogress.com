import React from 'react';
const { forwardRef } = React;

const component = (props = {}, ref = {}) => {
  return <svg ref={ref} {...props} />;
};

const ReactComponent = forwardRef(component);

export default {
  ReactComponent,
  default: 'file.svg',
};
