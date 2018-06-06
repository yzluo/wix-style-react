import React from 'react';
import PropTypes from 'prop-types';
import AddItem from '../../src/AddItem/AddItem';

const style = {
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: '0 25px 25px'
};

const Example = () =>
  <div>
    <div className="ltr" style={style}>Add Item - no tooltip<br/><br/><AddItem dataHook="add-item" onAddImage={() => {}}/></div>
    <div className="ltr" style={style}>Add Item - with tooltip <br/><br/><AddItem dataHook="add-item" tooltipContent="Add Tooltip Content" onAddImage={() => {}}/></div>
  </div>;

Example.propTypes = {
  theme: PropTypes.string
};

export default Example;
