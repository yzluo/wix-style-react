import React from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import { node, bool } from 'prop-types';

const SideMenu = ({ children, inFlex }) => {
  const rootStyles = classNames({
    [styles.root]: true,
    [styles.inFlex]: inFlex,
  });

  return (
    <div className={rootStyles} data-hook="side-menu">
      {children}
    </div>
  );
};

SideMenu.defaultProps = {
  inFlex: false,
};

SideMenu.propTypes = {
  inFlex: bool,
  children: node,
};

export default SideMenu;
