import React from 'react';
import PropTypes from 'prop-types';

const HoverSlot = ({display, children, ...props}) => (
  <span data-hover-slot={display} {...props}>
    {children}
  </span>
);

HoverSlot.propTypes = {
  display: PropTypes.oneOf(['always', 'onHover', 'notOnHover']),
  children: PropTypes.node
};

export default HoverSlot;
