import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import {DragDropContextProvider} from 'react-dnd';
import backend from 'react-dnd-html5-backend';
import DragAndDropLarge from 'wix-style-react/new-icons/system/DragAndDropLarge';
import styles from './SingleAreaList.scss';

/**
 * An example for a simple drag and drop list component.
 */
export default class SingleAreaList extends React.Component {
  constructor() {
    super();
    this.state = {items: [
      {
        id: 'a',
        text: 'Item 1'
      },
      {
        id: 'b',
        text: 'Item 2'
      },
      {
        id: 'c',
        text: 'Item 3'
      },
      {
        id: 'd',
        text: 'Item 4'
      }
    ]};
  }

  _onMove = ({id, from, to}) => {
    this.setState(
      ({items: [..._items]}) =>
        _items.splice(to, 0, ..._items.splice(from, 1)) && {
          items: _items
        }, () => {
      console.log(`onMove(id: ${id} from: ${from} to: ${to})`);
    });
  };


  _renderItem = ({isPlaceholder, isPreview, id, connectHandle, text}) => {
    const classes = classNames(
      styles.card,
      {
        [styles.placeholder]: isPlaceholder,
        [styles.preview]: isPreview
      });

    return (
      <div className={classes} data-hook={`item-${id}`}>
        {connectHandle(
          <div className={styles.handle} data-hook={`card-${id}-handle`}>
            <DragAndDropLarge/>
          </div>
        )}
        {text}
      </div>
    );
  };

  render() {
    return (
      <DragDropContextProvider backend={backend}>
        <SortableList
          dataHook="list-single-area"
          withHandle
          items={this.state.items}
          render={this._renderItem}
          onMove={this._onMove}
          />
      </DragDropContextProvider>
    );
  }
}

