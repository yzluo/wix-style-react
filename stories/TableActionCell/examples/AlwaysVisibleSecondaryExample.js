import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import {Duplicate, Print} from 'wix-style-react/new-icons';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-always-visible-secondary"
      secondaryActions={[
        {text: 'Duplicate', icon: <Duplicate/>, onClick: () => window.alert('Duplicate action was triggered.')},
        {text: 'Print', icon: <Print/>, onClick: () => window.alert('Print action was triggered.')}
      ]}
      numOfVisibleSecondaryActions={2}
      alwaysShowSecondaryActions
      />
  </tr>
);

export default Example;
