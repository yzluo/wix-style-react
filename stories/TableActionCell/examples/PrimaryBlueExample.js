import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-primary-blue"
      primaryAction={{
        text: 'Edit',
        theme: 'fullblue',
        onClick: () => window.alert('Primary action was triggered!')
      }}
      />
  </tr>
);

export default Example;
