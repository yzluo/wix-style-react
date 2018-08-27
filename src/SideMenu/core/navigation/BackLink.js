import React from 'react';
import {func, node} from 'prop-types';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import styles from './styles.scss';

const BackLink = ({onBackHandler, children}) => (
  <a className={styles.backLink} onClick={onBackHandler} data-hook="menu-navigation-back-link">
    <span className={styles.backArrow}><ChevronLeft size="14px"/></span>
    <span className={styles.backLabel}>{children}</span>
  </a>
);

BackLink.propTypes = {
  onBackHandler: func,
  children: node
};

export default BackLink;
