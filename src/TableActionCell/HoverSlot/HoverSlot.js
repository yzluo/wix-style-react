import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../TableActionCell.scss';

const HoverSlot = ({display, children, ...props}) => (
  <span className={classNames(styles.hoverSlot, styles[display])} {...props}>
    {children}
  </span>
);

HoverSlot.propTypes = {
  display: PropTypes.oneOf(['always', 'onHover', 'notOnHover']),
  children: PropTypes.node
};

export default HoverSlot;
