import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';
import {Download, Duplicate} from 'wix-style-react/new-icons';

import styles from '../TableActionCell.story.scss';

const Example = () => (
  <tr className={styles.previewWrapper}>
    <TableActionCell
      dataHook="story-only-visible-secondary"
      secondaryActions={[
        {text: 'Download', icon: <Download/>, onClick: () => window.alert('Download action was triggered.')},
        {text: 'Duplicate', icon: <Duplicate/>, onClick: () => window.alert('Duplicate action was triggered.')}
      ]}
      numOfVisibleSecondaryActions={2}
      />
  </tr>
);

export default Example;
