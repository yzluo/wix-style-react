import React from 'react';
import styles from './component.scss';
import Text from '../../Text';

export default ({ title, withIcon }) => (
  <div className={`${styles.header} ${withIcon ? styles.withIcon : ''}`}>
    <Text dataHook="accordion-title">{title}</Text>
  </div>
);
