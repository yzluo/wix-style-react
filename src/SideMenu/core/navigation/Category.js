import React from 'react';
import { node } from 'prop-types';
import styles from './styles.scss';

const Category = ({ children }) => (
  <div className={styles.categoryLabel} data-hook="menu-navigation-category">
    {children}
  </div>
);

Category.propTypes = {
  children: node,
};

export default Category;
