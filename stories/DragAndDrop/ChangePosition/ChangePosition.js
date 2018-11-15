import React from 'react';
import s from './ChangePosition.scss';
import DraggableRelative from '../../../src/DragAndDrop/Draggable/components/DraggableRelative';
import DraggableAbsolute from '../../../src/DragAndDrop/Draggable/components/DraggableAbsolute';

export default class ChangePosition extends React.Component {
  state = {
    items: [
      {text: 'Drag me', styles: {top: 20, left: 20, deltaLeft: 0, deltaTop: 0}},
      {text: 'Drag me too', styles: {top: 230, left: 170, deltaLeft: 0, deltaTop: 0}}
    ]
  };

  render() {
    return (
      <div className={s.root}>
        <DraggableRelative
          items={this.state.items}
          renderItem={this.renderDynamicItem}
          onMove={this.onMove}
          >
          {this.state.items.map((item, index) => (
            <DraggableAbsolute
              key={index}
              index={index}
              top={item.styles.top + item.styles.deltaTop}
              left={item.styles.left + item.styles.deltaLeft}
              >
              <div className={s.item}>{item.text}</div>
            </DraggableAbsolute>
          ))}
        </DraggableRelative>
      </div>
    );
  }

  onMove = (index, deltaLeft, deltaTop) => {
    const item = this.state.items[index];
    item.styles = {
      left: item.styles.left,
      top: item.styles.top,
      deltaLeft: item.styles.deltaLeft + deltaLeft,
      deltaTop: item.styles.deltaTop + deltaTop
    };
    this.setState({items: this.state.items});
  };

}
