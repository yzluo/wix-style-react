import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './../types';

const boxSource = {
  beginDrag: ({index}) => {
    return {index};
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    children: PropTypes.node,
    index: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number
  };

  render() {
    const {connectDragSource, isDragging, children, left, top} = this.props;
    if (isDragging) {
      return null;
    }

    return connectDragSource(<div style={{position: 'absolute', left, top, cursor: 'move'}}>{children}</div>);
  }
}
