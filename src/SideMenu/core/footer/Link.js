import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Link = ({ children, icon, ...rest }) => (
  <a className={styles.link} {...rest}>
    {icon && <div className={styles.linkIcon}>{icon}</div>}
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
};

export default Link;
