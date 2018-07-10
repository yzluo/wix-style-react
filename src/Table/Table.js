import React from 'react';
import {string, number, arrayOf, oneOfType, func, bool, any, object, node, oneOf, shape, array} from 'prop-types';
import omit from 'lodash/omit';
import defaultTo from 'lodash/defaultTo';

import DataTable from '../DataTable';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox';
import {TableContext} from './TableContext';
import {BulkSelection, BulkSelectionState} from './BulkSelection';
import {TableToolbarToggler, TableToolbarContainer, TableTitleBar, TableContent} from './components';
import Tooltip from '../Tooltip/Tooltip';

export function createColumns({tableProps, bulkSelectionContext}) {
  const createCheckboxColumn = (
    {
      toggleAll,
      bulkSelectionState,
      toggleSelectionById,
      isSelected
    }
  ) => {
    return {
      title: <Checkbox
        dataHook="table-select"
        checked={bulkSelectionState === BulkSelectionState.ALL}
        indeterminate={bulkSelectionState === BulkSelectionState.SOME}
        onChange={() => toggleAll()}
        />,
      render: (row, rowNum) => {
        const id = defaultTo(row.id, rowNum);
        return (
          <Checkbox
            dataHook="row-select"
            checked={isSelected(id)}
            onChange={() => toggleSelectionById(id)}
            />
        );
      },
      width: '12px'
    };
  };

  return tableProps.showSelection ? [createCheckboxColumn(bulkSelectionContext), ...tableProps.columns] : tableProps.columns;
}


export function getDataTableProps(tableProps) {
  return {
    ...omit(tableProps,
          'showSelection',
          'selectedIds',
          'onSelectionChanged',
          'dataHook',
          'newDesign',
          'hideHeader',
        ),
    newDesign: true
  };
}



/**
 * Table is a composit component that allows adding SelectionColumn, Toolbar (on top of the TitleBar).
 * It is a context provider, and thus the Table.Consumer, Table.TitleBar and Table.Content can be rendered separatly.
 */
export class Table extends WixComponent {

  static ToolbarContainer = TableToolbarContainer;
  static Titlebar = TableTitleBar;
  static Content = TableContent;

  static ToggledToolbar = TableToolbarToggler;

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    // The state IS the props since Table acts as a context provider for all Table props.
    this.setState(nextProps);
  }

  shouldComponentUpdate() {
    // Table is not really a PureComponent
    return true;
  }

  setSelectedIds(selectedIds) {
    this.bulkSelection.setSelectedIds(selectedIds);
  }

  renderChildren() {
    const children = this.props.children;
    return this.props.withWrapper ? (
      <div>
        {children}
      </div>) :
      children;
  }

  render() {
    return (
      <TableContext.Provider value={this.state}>
        {this.props.showSelection ?
        (
          <BulkSelection
            ref={_ref => this.bulkSelection = _ref}
            selectedIds={this.props.selectedIds}
            allIds={this.state.data.map((rowData, rowIndex) => defaultTo(rowData.id, rowIndex))}
            onSelectionChanged={this.props.onSelectionChanged}
            >
            {this.renderChildren()}
          </BulkSelection>
        ) :
        this.renderChildren()
        }
      </TableContext.Provider>
    );
  }
}

Table.displayName = 'Table';

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  children:
  [
    <Table.Content key="content"/>
  ],
  withWrapper: true,
  showLastRowDivider: false
};

Table.propTypes = {
  children: any,
  dataHook: string,

  //DataTable Props
  /** Allows to open multiple row details */
  allowMultiDetailsExpansion: bool,
  /** The data to display. (If data.id exists then it will be used as the React key value for each row, otherwise, the rowIndex will be used) */
  data: array, // Not performing any shape validation to not hurt performance.
  /** Configuration of the table's columns. See table below */
  columns: arrayOf(shape({
    title: oneOfType([
      node,
      string
    ]).isRequired,
    render: func.isRequired,
    sortable: bool,
    infoTooltipProps: shape(Tooltip.propTypes),
    sortDescending: bool
  })).isRequired,
  /** A func that gets row data and returns a class(es) to apply to that specific row */
  dynamicRowClass: func,
  /** Whether there are more items to be loaded. Event listeners are removed if false. */
  hasMore: bool,
  /** Should we hide the header of the table. */
  hideHeader: bool,
  /** An id to pass to the table */
  id: string,
  /** If true, table will not render all data to begin with, but will gradually render the data as the user scrolls */
  infiniteScroll: bool,
  /** If infiniteScroll is on, this prop will determine how many rows will be rendered on each load */
  itemsPerPage: number,
  /** The loader to show when loading more items. */
  loader: node,
  /** A callback when more items are requested by the user. */
  loadMore: func,
  /** A callback method to be called on row click. Signature: `onRowClick(rowData, rowNum)` */
  onRowClick: func,
  /** A callback method to be called on row mouse enter. Signature: `onMouseEnterRow(rowData, rowNum)` */
  onMouseEnterRow: func,
  /** A callback method to be called on row mouse leave. Signature: `onMouseLeaveRow(rowData, rowNum)` */
  onMouseLeaveRow: func,

  /** Add scroll listeners to the window, or else, the component's parentNode. */
  useWindow: bool,
  /** Add scroll listeners to specified DOM Object. */
  scrollElement: object,
  /** Table cell vertical padding. should be 'medium' or 'large'  */
  rowVerticalPadding: oneOf([
    'medium',
    'large'
  ]),
  /** Function that returns React component that will be rendered in row details section. Example: `rowDetails={(row, rowNum) => <MyRowDetailsComponent {...row} />}` */
  rowDetails: func,
  /** A string data-hook to apply to all table body rows. or a func which calculates the data-hook for each row  - Signature: `(rowData, rowNum) => string` */
  rowDataHook: oneOfType([
    func,
    string
  ]),
  /** A class to apply to all table body rows */
  rowClass: string,

  /** Should the table show the header when data is empty */
  showHeaderWhenEmpty: bool,

  // Table props

  /** Called when row selection changes.
   * Receives 2 arguments: `selectedIds` array, and a `change` object ( in this order).
   * `selectedIds` is the updated selected ids.
   * `change` object has a `type` property with the following possible values: 'ALL', 'NONE', 'SINGLE_TOGGLE'.
   * In case of 'SINGLE_TOGGLE' the `change` object will also include an `id` prop with the item's id,
   * and a `value` prop with the new boolean selection state of the item. */
  onSelectionChanged: func,
  /** Indicates wether to show a selection column (with checkboxes) */
  showSelection: bool,
  /** Array of selected row ids.
   *  Idealy, id should be a property on the data row object.
   *  If data objects do not have id property, then the data row's index would be used as an id. */
  selectedIds: oneOfType([arrayOf(string), arrayOf(number)]),
  /** The width of the fixed table. Can be in percentages or pixels. */
  width: string,
  /**
   *  When false then Table would not create a `<div/>` wrapper around it's children.
   *  Useful when using `<Table/>` to wrap a `<Page/>` component, in that case we use the `<Table/>` only as a context provider and it doesn't render anything to the DOM by itself.*/
  withWrapper: bool
};

// export default Table;
