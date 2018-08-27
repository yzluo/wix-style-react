import React from 'react';
import EmptyState from '../../EmptyState';

import styles from '../Table.scss';

export const TableEmptyState = props => (
  <div className={styles.emptyStateContainer}>
    <EmptyState
      {...props}
      />
  </div>
);

TableEmptyState.displayName = 'Table.EmptyState';

TableEmptyState.propTypes = {
  ...EmptyState.propTypes
};

TableEmptyState.defaultProps = {
  ...EmptyState.defaultProps
};
