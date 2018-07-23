import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.scss';
import Button from '../../Button';
import ChevronRight from '../../new-icons/ChevronRight';

/* eslint-disable react/prop-types */
function renderPrimaryAction({primaryRowAction, rowData, rowNum}) {
  return !primaryRowAction ? null : (
    <span className={styles.primaryActionContainer} data-hook="table-action-column-primary-action">
      <Button
        theme={primaryRowAction.theme}
        onClick={event => {
          primaryRowAction.onActionTrigger(rowData, rowNum);

          // Making sure we don't also trigger onRowClick
          event.stopPropagation();
        }}
        >
        {primaryRowAction.name}
      </Button>
    </span>
  );
}
/* eslint-enable react/prop-types */

export const TableActionColumn = props => {
  return (
    <span className={styles.actionsContainer} data-hook="table-action-column">

      {renderPrimaryAction(props)}

      {props.primaryRowAction && (
        <span className={styles.primaryActionPlaceholder} data-hook="table-action-column-primary-placeholder">
          <Button theme="icon-white" withNewIcons >
            <ChevronRight/>
          </Button>
        </span>
      )}
    </span>
  );
};

TableActionColumn.displayName = 'Table.ActionColumn';

TableActionColumn.propTypes = {
  rowData: PropTypes.object.isRequired,
  rowNum: PropTypes.number.isRequired,

  /** documentation for primaryRowAction */
  primaryRowAction: PropTypes.shape({
    name: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['whiteblue', 'fullblue']),
    onActionTrigger: PropTypes.func.isRequired
  })
};

TableActionColumn.defaultProps = {
  primaryRowAction: null
};
