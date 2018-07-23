import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Separator = ({ children }) => (
  <div className={styles.separator} data-hook="menu-navigation-separator">
    {children}
  </div>
);

Separator.propTypes = {
  children: PropTypes.node,
};

export default Separator;
