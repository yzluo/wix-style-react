import React from 'react';
import PropTypes from 'prop-types';
import AddItem from '../../src/AddItem/AddItem';
import {Container, Row, Col} from '../../src/Grid';

const style = {
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: '0 25px 25px'
};

const Example = () => (
  <Container>
    <Row>
      <Col span={8}>
        <h3>Add Item - no tooltip</h3>
        <AddItem dataHook="add-item" onAddImage={() => {}}/>
      </Col>
      <Col span={4}>
        <h3>Add Item - with tooltip</h3>
        <AddItem
          dataHook="add-item"
          tooltipContent="Add Tooltip Content"
          onAddImage={() => {}}
          />
      </Col>
    </Row>
  </Container>
);

Example.propTypes = {
  theme: PropTypes.string
};

export default Example;
