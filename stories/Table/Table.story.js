import React from 'react';
import s from './Table.story.scss';
import {storySettings} from './storySettings';
import CodeExample from 'wix-storybook-utils/CodeExample';

import {Table} from '../../src/Table/Table';

import {TableExample} from './TableExample';
import TableExampleRaw from '!raw-loader!./TableExample';

import {TablePageExample} from './TablePageExample';
import TablePageExampleRaw from '!raw-loader!./TablePageExample';

import {TableEmptyStateExample} from './TableEmptyStateExample';
import TableEmptyStateExampleRaw from '!raw-loader!./TableEmptyStateExample';

const data = [
  {firstName: 'Meghan', lastName: 'Bishop'},
  {firstName: 'Sara', lastName: 'Porter'},
  {firstName: 'Deborah', lastName: 'Rhodes'},
  {firstName: 'Walter', lastName: 'Jenning'}
];

const dataLong = [1, 2, 3, 4, 5].reduce(accum => accum.concat(data), []);

const columnsOption1 = [
  {title: 'First', width: '30%', render: row => row.firstName},
  {title: 'Last', width: '30%', render: row => row.lastName}
];

const columnsOption2 = [
  {title: 'Row Num', render: (row, rowNum) => rowNum},
  {title: 'First', render: row => row.firstName},
  {title: 'Last', render: row => row.lastName},
  {title: 'Full', render: row => row.firstName + row.lastName}
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Table,
  componentPath: '../../src/Table/Table.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    id: 'id',
    data,
    columns: columnsOption1,
    showSelection: true
  },
  exampleProps: {
    columns: [
      {label: '2 columns example', value: columnsOption1},
      {label: '4 columns example', value: columnsOption2}
    ],
    data: [
      {label: '4 rows', value: data},
      {label: '40 rows', value: dataLong}
    ]
  },
  codeExample: false,
  examples: (
    <div>
      <div className={s.examples}>
        <div className={s.example}>
          <CodeExample title="Typical (With Toolbar)" code={TableExampleRaw}>
            <TableExample/>
          </CodeExample>
        </div>
        <div className={s.example}>
          <CodeExample title="Table in a Page (Fixed Header)" code={TablePageExampleRaw}>
            <TablePageExample/>
          </CodeExample>
        </div>
        <div className={s.example}>
          <CodeExample title="Table with EmptyState" code={TableEmptyStateExampleRaw}>
            <TableEmptyStateExample/>
          </CodeExample>
        </div>
      </div>
    </div>
  )
};
