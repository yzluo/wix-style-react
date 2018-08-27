import React from 'react';
import EmptyState from '../../EmptyState';

import styles from './EmptyState.scss';

const CardEmptyState = props => (
  <div className={styles.emptyStateContainer}>
    <EmptyState
      {...props}
      />
  </div>
);

CardEmptyState.displayName = 'Card.EmptyState';

CardEmptyState.propTypes = {
  ...EmptyState.propTypes
};

CardEmptyState.defaultProps = {
  ...EmptyState.defaultProps
};

export default CardEmptyState;
