import React from 'react';
import {bool} from 'prop-types';
import DataTable from '../../DataTable';
import {getDataTableProps, createColumns} from '../Table';
import {TableContext} from '../TableContext';
import {BulkSelectionConsumer} from '../BulkSelection';
import style from './TableContent.st.css';

export const TableContent = ({titleBarVisible}) => {
  // TODO: figure out if we need to put result of createColumns() on state, in order to avoid
  // redundant renders.

  return (
    <TableContext.Consumer>
      {
        tableProps => {
          const dataTableProps = {
            ...getDataTableProps(tableProps),
            dataHook: 'table-content',
            hideHeader: !titleBarVisible
          };

          const dataTable = tableProps.showSelection ?
          (
            <BulkSelectionConsumer consumerCompName="Table.Content" providerCompName="Table">
              {bulkSelectionContext => (
                <DataTable
                  {...dataTableProps}
                  columns={createColumns({tableProps, bulkSelectionContext})}
                  className={style.dataTable}
                  />
              )}
            </BulkSelectionConsumer>
          ) :
          (
            <DataTable
              {...dataTableProps}
              />
          );

          return (
            <div {...style('root')}>
              {dataTable}
            </div>
          );
        }
      }
    </TableContext.Consumer>
  );
};
TableContent.displayName = 'Table.Content';
TableContent.propTypes = {
  titleBarVisible: bool
};
TableContent.defaultProps = {
  titleBarVisible: true
};
