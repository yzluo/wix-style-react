import React from 'react';
import {any} from 'prop-types';
import {BulkSelectionConsumer, BulkSelectionContextPropTypes} from '../BulkSelection';
import style from './TableToolbarContainer.st.css';

export const TableToolbarContainer = props => {
  return (
    <div {...style('root', {}, props)}>
      <BulkSelectionConsumer consumerCompName="Table.ToolbarContainer" providerCompName="Table">
        {props.children}
      </BulkSelectionConsumer>
    </div>
  );
};

TableToolbarContainer.displayName = 'Table.ToolbarContainer';
TableToolbarContainer.propTypes = {
  children: any
};

/** Helper for PropTypes for componenst which consume the SelectioContext */
export const SelectionContextPropTypes = BulkSelectionContextPropTypes;
