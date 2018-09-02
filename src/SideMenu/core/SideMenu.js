import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const SideMenu = ({children, inFlex, className}) => {
  const rootStyles = classNames({
    [styles.root]: true,
    [styles.inFlex]: inFlex
  }, className);

  return (
    <div className={rootStyles} data-hook="side-menu">
      {children}
    </div>
  );
};

SideMenu.defaultProps = {
  inFlex: false
};

SideMenu.propTypes = {
  inFlex: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
};

export default SideMenu;
