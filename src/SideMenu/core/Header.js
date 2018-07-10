import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Logo = ({onClick, children}) => {
  const classes = classNames(styles.logo, {[styles.clickable]: !!onClick});
  return (
    <div onClick={onClick} className={classes} data-hook="menu-header">
      {children}
    </div>
  );

};

Logo.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Logo;

