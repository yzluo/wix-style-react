import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import Plus2 from '../Icons/dist/components/Plus2';
import WixComponent from '../BaseComponents/WixComponent';

class AddItem extends WixComponent {

  render() {

    let {
      onAddItem,
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
      placement: 'top',
      moveBy: {x: 2, y: 0}
    };

    return (
      <div className={style.container} style={{width, height}} data-hook="add-container">
        <div data-hook="add-area" className={style.addLogo} onClick={onAddItem}>
          <Tooltip content={tooltipContent} disabled={!tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
            <div className={style.dashedBorder} >
              <div className={style.plusIcon}><Plus2 size="47px"/></div>
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

AddItem.propTypes = {
  onAddItem: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipContent: PropTypes.string
};

export default AddItem;
