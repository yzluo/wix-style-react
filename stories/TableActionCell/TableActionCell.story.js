import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import {storySettings} from './storySettings';
import styles from '../Table/Table.story.scss';

import TableActionCell from '../../src/TableActionCell';

import {PrimaryExample} from './examples/Primary';
import PrimaryExampleRaw from '!raw-loader!./examples/Primary';

import {PrimarySecondaryExample} from './examples/PrimarySecondary';
import PrimarySecondaryExampleRaw from '!raw-loader!./examples/PrimarySecondary';

import {Star, Download, Duplicate, Print} from 'wix-style-react/new-icons';

const primaryActionOptions1 = {
  name: 'Details',
  theme: 'fullblue',
  onActionTrigger: () => console.log('Details action called!')
};

const primaryActionOptions2 = {
  ...primaryActionOptions1,
  theme: 'whiteblue'
};

const secondaryActionsOption = [
  {name: 'Star', icon: <Star/>, onActionTrigger: () => console.log('Star action called!')},
  {name: 'Download', icon: <Download/>, onActionTrigger: () => console.log('Download action called!')},
  {name: 'Duplicate', icon: <Duplicate/>, onActionTrigger: () => console.log('Duplicate action called!')},
  {name: 'Print', icon: <Print/>, onActionTrigger: () => console.log('Print action called!')}
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: props => (
    <tr className={styles.previewWrapper}>
      <TableActionCell {...props}/>
    </tr>
  ),
  componentPath: '../../src/TableActionCell/TableActionCell.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    primaryAction: primaryActionOptions1,
    secondaryActions: secondaryActionsOption,
    visibleSecondaryActions: 2,
    alwaysShowSecondaryActions: true
  },

  exampleProps: {
    primaryAction: [
      {label: 'No primary action', value: null},
      {label: 'Blue primary action', value: primaryActionOptions1},
      {label: 'White primary action', value: primaryActionOptions2}
    ],
    secondaryActions: [
      {label: 'No secondary actions', value: []},
      {label: '4 secondary actions', value: secondaryActionsOption}
    ]
  },

  examples: (
    <div className={styles.examples}>
      <div className={styles.example}>
        <CodeExample title="Table with Action Cell (Primary Action Only)" code={PrimaryExampleRaw}>
          <PrimaryExample/>
        </CodeExample>
      </div>
      <div className={styles.example}>
        <CodeExample title="Table with Action Cell (Primary and Secondary Actions)" code={PrimarySecondaryExampleRaw}>
          <PrimarySecondaryExample/>
        </CodeExample>
      </div>
    </div>
  )
};
