import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../Table.scss';
import Tooltip from '../../Tooltip/Tooltip';
import Button from '../../Button';
import PopoverMenu from '../../PopoverMenu';
import PopoverMenuItem from '../../PopoverMenuItem';
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

function renderSecondaryActions({
  primaryRowAction,
  secondaryRowActions,
  visibleSecondaryActions,
  alwaysShowSecondaryActions,
  rowData,
  rowNum
}) {
  if (!secondaryRowActions) {
    return null;
  }

  const visibleActions = secondaryRowActions.slice(0, visibleSecondaryActions);
  const hiddenActions = secondaryRowActions.slice(visibleSecondaryActions);

  return (
    <span
      className={classNames(styles.secondaryActionsContainer, {
        [styles.alwaysShowSecondaryActions]: alwaysShowSecondaryActions,
        [styles.alwaysShowPopoverMenu]: !!primaryRowAction || alwaysShowSecondaryActions
      })}
      >

      <span className={styles.visibleSecondaryActions} data-hook="table-action-column-visible-secondary-actions">
        {visibleActions.map((action, idx) => (
          <Tooltip
            key={idx}
            dataHook="table-action-column-secondary-action-tooltip"
            content={action.name}
            shouldCloseOnClickOutside
            theme="dark"
            >
            <Button
              theme="icon-white"
              onClick={event => {
                action.onActionTrigger(rowData, rowNum);
                event.stopPropagation();
              }}
              withNewIcons
              >
              {React.cloneElement(action.icon)}
            </Button>
          </Tooltip>
        ))}
      </span>

      {hiddenActions.length > 0 && (
        <span className={styles.popoverMenuContainer}>
          <PopoverMenu buttonTheme="icon-white" dataHook="table-action-column-popover-menu">
            {hiddenActions.map((action, idx) => (
              <PopoverMenuItem
                key={idx}
                dataHook="table-action-column-popover-menu-item"
                icon={action.icon}
                onClick={() => action.onActionTrigger(rowData, rowNum)}
                text={action.name}
                />
            ))}
          </PopoverMenu>
        </span>
      )}
    </span>
  );
}
/* eslint-enable react/prop-types */

export const TableActionColumn = props => {
  return (
    <span className={styles.actionsContainer} data-hook="table-action-column">

      {renderPrimaryAction(props)}

      {renderSecondaryActions(props)}

      {(props.primaryRowAction && !props.secondaryRowActions) && (
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
  }),

  /** documentation for secondaryRowActions */
  secondaryRowActions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    onActionTrigger: PropTypes.func.isRequired
  })),

  /** documentation for visibleSecondaryActions */
  visibleSecondaryActions: PropTypes.number,

  /** documentation for alwaysShowSecondaryActions */
  alwaysShowSecondaryActions: PropTypes.bool
};

TableActionColumn.defaultProps = {
  primaryRowAction: null,
  secondaryRowActions: null,
  visibleSecondaryActions: 0,
  alwaysShowSecondaryActions: false
};
