import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import {Download, Duplicate} from 'wix-style-react/new-icons';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-only-visible-secondary"
      secondaryActions={[
        {name: 'Download', icon: <Download/>, onActionTrigger: () => window.alert('Download action was triggered.')},
        {name: 'Duplicate', icon: <Duplicate/>, onActionTrigger: () => window.alert('Duplicate action was triggered.')}
      ]}
      visibleSecondaryActions={2}
      />
  </tr>
);

export default Example;
