import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';

import WixComponent from '../BaseComponents/WixComponent';

const tooltipCommonProps = {
  showDelay: 0,
  theme: 'dark',
  hideDelay: 0,
  align: 'center',
  placement: 'top'
};

const renderInnerAddItem = () => (
  <div className={style.dashedBorder} >
    <div className={style.plusIcon}><AddMedia size="31px"/></div>
  </div>
);

class AddItem extends WixComponent {
  render() {
    const {
      onClick,
      width,
      height,
      tooltipContent
    } = this.props;

    return (
      <div className={style.container} style={{width, height}} data-hook="add-container">
        <div data-hook="add-area" className={style.addLogo} onClick={onClick}>
          {
            tooltipContent ?
              <Tooltip content={tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
                {renderInnerAddItem()}
              </Tooltip> :
              renderInnerAddItem()
          }
        </div>
      </div>
    );
  }
}

AddItem.propTypes = {
  /** Callback function for adding an item */
  onClick: PropTypes.func,
  /** Width in pixels */
  width: PropTypes.number,
  /** Height in pixels */
  height: PropTypes.number,
  /** Content of the tooltip */
  tooltipContent: PropTypes.string
};

export default AddItem;
