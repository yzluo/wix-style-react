import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import {Star, Download, Duplicate, Print} from 'wix-style-react/new-icons';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-primary-secondary"
      primaryAction={{
        name: 'Edit',
        theme: 'whiteblue',
        onActionTrigger: () => window.alert('Primary action was triggered!')
      }}
      secondaryActions={[
        {name: 'Star', icon: <Star/>, onActionTrigger: () => window.alert('Star action was triggered.')},
        {name: 'Download', icon: <Download/>, onActionTrigger: () => window.alert('Download action was triggered.')},
        {name: 'Duplicate', icon: <Duplicate/>, onActionTrigger: () => window.alert('Duplicate action was triggered.')},
        {name: 'Print', icon: <Print/>, onActionTrigger: () => window.alert('Print action was triggered.')}
      ]}
      visibleSecondaryActions={1}
      />
  </tr>
);

export default Example;
