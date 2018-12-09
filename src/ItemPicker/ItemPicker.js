import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Search from '../Search/Search';
import * as styles from './ItemPicker.scss';
import Tooltip from '../Tooltip/Tooltip';
import debounce from 'lodash/debounce';
import { ItemPickerContent } from '../ItemPickerContent';

export class ItemPicker extends WixComponent {
  constructor(props) {
    super(props);
    this.state = { items: [], inputText: '', isFetching: false };
  }

  static propTypes = {
    button: PropTypes.any,
    fetchItems: PropTypes.func,
    emptyStateComponent: PropTypes.any,
    itemBuilder: PropTypes.func,
    footer: PropTypes.any,
    onSelect: PropTypes.func,
  };

  render = () => (
    <Tooltip
      dataHook={'item-picker'}
      placement={'bottom'}
      alignment="left"
      minWidth="331px"
      popover
      content={this.buildContent()}
    >
      {this.props.button}
    </Tooltip>
  );

  buildContent = () => (
    <ItemPickerContent
      fetchItems={this.props.fetchItems}
      emptyStateComponent={this.props.emptyStateComponent}
      itemBuilder={this.props.itemBuilder}
      footer={this.props.footer}
      onSelect={this.props.onSelect}
    />
  );
}
