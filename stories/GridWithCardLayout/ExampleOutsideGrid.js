import React from 'react';
import {Row, Col, Card} from '../../src/Grid';
import styles from './ExampleGrid.scss';

import Input from '../../src/Input';
import Text from '../../src/Text';

export default () => {
  return (
    <div data-hook="card-example-outside-a-grid" className={styles.exampleContainer}>
      <Card>
        <Card.Header
          title={'Card outside a Grid'}
          />
        <Card.Content>
          <Row>
            <Col span={12}>
              <Text>Text in content</Text>
              <Input
                clearButton
                error={false}
                onChange={e => this.setState({email: e.target.value})}
                roundInput={false}
                value={'some@mail.com'}
                />
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </div>
  );
};

