import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Navigation = ({ children }) => (
  <div className={styles.navigation} data-hook="menu-navigation">
    {children}
  </div>
);

Navigation.propTypes = {
  children: PropTypes.node,
};

export default Navigation;
