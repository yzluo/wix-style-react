import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import {Duplicate, Print} from 'wix-style-react/new-icons';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-always-visible-secondary"
      secondaryActions={[
        {name: 'Duplicate', icon: <Duplicate/>, onActionTrigger: () => window.alert('Duplicate action was triggered.')},
        {name: 'Print', icon: <Print/>, onActionTrigger: () => window.alert('Print action was triggered.')}
      ]}
      visibleSecondaryActions={2}
      alwaysShowSecondaryActions
      />
  </tr>
);

export default Example;
