import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Search from '../Search/Search';
import * as styles from './ItemPicker.scss'
import Tooltip from '../Tooltip/Tooltip'
import debounce from 'lodash/debounce';
import { ItemPickerContent } from "../ItemPickerContent";

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
    onSelect: PropTypes.func
  };

  componentWillMount() {
    this.queryItems();
  }

  onSelectedItem = ({ id }) => {
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      inputText: selectedItem.title
    });
    this.props.onSelect(selectedItem);
  };

  queryItems = (query = '') => {
    this.props.fetchItems({ query }).then(items => {
      this.setState({ items: items });
    });
  };

  debouncedQueryItems = debounce(this.queryItems, 300);

  onChange = inputText => {
    inputText = inputText.target.value;
    this.setState({
      inputText: inputText
    });

    this.debouncedQueryItems(inputText);
  };

  displayItem = item => {
    return { id: item.id, value: this.props.itemBuilder(item) }
  };

  isEmpty = () => !this.state.items.length;

  pickerContent = () =>
    <span data-hook='item-picker-drop-down' className={styles.picker}>
      <div className={styles.searchWrapper}>
        <Search
          data-hook={'search'}
          className={styles.search}
          onChange={inputText => this.onChange(inputText)}
          placeholder={'Search...'}
          value={this.state.inputText}
        />
      </div>
      {this.isEmpty() ? this.props.emptyStateComponent() : this.pickerDropdown()}
      </span>;

  pickerDropdown = () =>
    <DropdownLayout
      dataHook='items-dropdown'
      className={styles.pickerDropdown}
      options={this.state.items.map(this.displayItem)}
      fixedFooter={this.props.footer}
      onSelect={item => this.onSelectedItem({ id: item.id })}
      inContainer
      visible
    />;

  render = () =>
    <Tooltip
      dataHook={'item-picker'}
      placement={'bottom'}
      alignment='left'
      minWidth='331px'
      popover
      content={this.buildContent()}>
      {this.props.button}
    </Tooltip>;

  buildContent = () => <ItemPickerContent fetchItems={this.props.fetchItems}
                                          emptyStateComponent={this.props.emptyStateComponent}
                                          itemBuilder={this.props.itemBuilder}
                                          footer={this.props.footer}
                                          onSelect={this.props.onSelect}/>

}


