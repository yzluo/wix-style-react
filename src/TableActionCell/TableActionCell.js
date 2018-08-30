import React from 'react';
import PropTypes from 'prop-types';

import styles from './TableActionCell.scss';
import HoverSlot from './HoverSlot';
import Tooltip from '../Tooltip/Tooltip';
import Button from '../Button';
import PopoverMenu from '../PopoverMenu';
import PopoverMenuItem from '../PopoverMenuItem';
import ChevronRight from '../new-icons/ChevronRight';

/* eslint-disable react/prop-types */
function renderPrimaryAction({name, theme, onActionTrigger}) {
  return (
    <Button
      theme={theme}
      onClick={event => {
        onActionTrigger();

        // Making sure we don't also trigger onRowClick
        event.stopPropagation();
      }}
      >
      {name}
    </Button>
  );
}
/* eslint-enable react/prop-types */

function renderVisibleActions(actions) {
  return actions.map(({name, icon, onActionTrigger}, index) => (
    <Tooltip
      key={index}
      dataHook="table-action-cell-visible-action-tooltip"
      content={name}
      theme="dark"
      >
      <Button
        theme="icon-greybackground"
        onClick={event => {
          onActionTrigger();
          event.stopPropagation();
        }}
        withNewIcons
        >
        {React.cloneElement(icon)}
      </Button>
    </Tooltip>
  ));
}

function renderHiddenActions(actions) {
  return (
    <PopoverMenu buttonTheme="icon-greybackground" dataHook="table-action-cell-popover-menu" appendToParent>
      {actions.map(({name, icon, onActionTrigger}, index) => (
        <PopoverMenuItem
          key={index}
          dataHook="table-action-cell-popover-menu-item"
          icon={icon}
          onClick={() => onActionTrigger()}
          text={name}
          />
      ))}
    </PopoverMenu>
  );
}

function renderPlaceholder() {
  return (
    <Button theme="icon-white" withNewIcons>
      <ChevronRight/>
    </Button>
  );
}

const TableActionCell = ({
  dataHook,
  primaryAction,
  secondaryActions,
  visibleSecondaryActions,
  alwaysShowSecondaryActions
}) => {
  const visibleActions = secondaryActions.slice(0, visibleSecondaryActions);
  const hiddenActions = secondaryActions.slice(visibleSecondaryActions);

  return (
    <span data-hook={dataHook} className={styles.actionsContainer}>

      {primaryAction && (
        <HoverSlot display="onHover" data-hook="table-action-cell-primary-action">
          {renderPrimaryAction(primaryAction)}
        </HoverSlot>
      )}

      {visibleActions.length > 0 && (
        <HoverSlot display={alwaysShowSecondaryActions ? 'always' : 'onHover'} data-hook="table-action-cell-visible-actions">
          {renderVisibleActions(visibleActions)}
        </HoverSlot>
      )}

      {hiddenActions.length > 0 && (
        <div onClick={e => e.stopPropagation()}>
          <HoverSlot display="always">
            {renderHiddenActions(hiddenActions)}
          </HoverSlot>
        </div>
      )}

      {(primaryAction && !(secondaryActions || []).length) && (
        <HoverSlot display="notOnHover" className={styles.placeholderIcon} data-hook="table-action-cell-placeholder">
          {renderPlaceholder()}
        </HoverSlot>
      )}
    </span>
  );
};

TableActionCell.displayName = 'TableActionCell';

TableActionCell.propTypes = {
  dataHook: PropTypes.string,

  /**
   * An object containing the primary action properties: `name` is the action
   * name (the text of the button), `theme` is the button theme (can be
   * `whiteblue` or `fullblue`), `onActionTrigger` is the callback function for
   * the action, whose signature is `onActionTrigger(rowData, rowNum)`.
   */
  primaryAction: PropTypes.shape({
    name: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['whiteblue', 'fullblue']),
    onActionTrigger: PropTypes.func.isRequired
  }),

  /**
   * An array containing the secondary actions: `name` is the action name
   * (will be shown in the tooltip), `icon` is the icon component for the
   * action, `onActionTrigger` is the callback function for the action, whose
   * signature is `onActionTrigger(rowData, rowNum)`.
   */
  secondaryActions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    onActionTrigger: PropTypes.func.isRequired
  })),

   /** The number of secondary actions to show outside the PopoverMenu */
  visibleSecondaryActions: PropTypes.number,

   /** Whether to show the secondary action also when not hovering the row */
  alwaysShowSecondaryActions: PropTypes.bool
};

TableActionCell.defaultProps = {
  primaryAction: null,
  secondaryActions: [],
  visibleSecondaryActions: 0,
  alwaysShowSecondaryActions: false
};

export default TableActionCell;
