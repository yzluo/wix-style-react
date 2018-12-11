import React from 'react';
import Calendar from '../../src/Calendar';
import CodeExample from 'wix-storybook-utils/CodeExample';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';
import ExampleStandard from './ExampleStandard';
import ExampleYearMonths from './ExampleYearMonths';
import ExampleYearMonthsRaw from '!raw-loader!./ExampleYearMonths';
import ExampleTooltip from './ExampleTooltip';
import ExampleTooltipRaw from '!raw-loader!./ExampleTooltip';
import { Container, Row, Col } from 'wix-style-react/Grid';

export default {
  category: '3. Inputs',
  storyName: '3.13 Calendar',

  component: Calendar,
  componentPath: '../../src/Calendar',

  componentProps: setState => ({
    onChange: value => setState({ value }),
    showYearDropdown: false,
    showMonthDropdown: false,
    shouldCloseOnSelect: true,
    locale: 'en',
    excludePastDates: false,
    selectionMode: 'day',
    dataHook: 'calendar',
  }),
  exampleProps: {
    value: [
      {
        label: `1st of Today's month`,
        value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
      {
        label: `Today`,
        value: new Date(),
      },
      {
        label: `Next Week (Range)`,
        value: { from: new Date(), to: dayOffset(new Date(), 6) },
      },
      {
        label: `Last Week (Range)`,
        value: { from: dayOffset(new Date(), -6), to: new Date() },
      },
    ],
  },
  examples: (
    <Container>
      <Row>
        <Col span={4}>
          <CodeExample title="Standard" code={ExampleStandardRaw}>
            <ExampleStandard />
          </CodeExample>
        </Col>
        <Col span={4}>
          <CodeExample
            title="With Years and Months selection"
            code={ExampleYearMonthsRaw}
          >
            <ExampleYearMonths />
          </CodeExample>
        </Col>
        <Col span={4}>
          <CodeExample title="Within a Tooltip" code={ExampleTooltipRaw}>
            <ExampleTooltip />
          </CodeExample>
        </Col>
      </Row>
    </Container>
  ),
};

function dayOffset(date, offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}
