import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';

import WixComponent from '../BaseComponents/WixComponent';

class AddItem extends WixComponent {

  render() {

    let {
      onClick,
      width,
      height,
      tooltipContent
    } = this.props;

    tooltipContent = tooltipContent || '';

    const tooltipCommonProps = {
      showDelay: 0,
      theme: 'dark',
      hideDelay: 0,
      align: 'center',
      placement: 'top'
    };

    return (
      <div className={style.container} style={{width, height}} data-hook="add-container">
        <div data-hook="add-area" className={style.addLogo} onClick={onClick}>
          <Tooltip content={tooltipContent} disabled={!tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
            <div className={style.dashedBorder} >
              <div className={style.plusIcon}><AddMedia size="31px"/></div>
            </div>
          </Tooltip>
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
