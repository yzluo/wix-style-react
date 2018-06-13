import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';

import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

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
      tooltipContent,
      aspectRatio
    } = this.props;

    let ratio;

    if (!height) {
      switch (aspectRatio) {
        case '16/9':
          ratio = style.ratio16x9;
          break;
        case '3/4':
          ratio = style.ratio2x1;
          break;
        case '4/3':
          ratio = style.ratio3x1;
          break;
        default:
          ratio = style.ratio1x1;
          break;
      }
  }
    return (
      <div className={classNames(ratio, style.box)} style={{height}} >
        <div className={classNames(style.content, style.container)} data-hook="add-container">
          <div data-hook="add-area" className={style.addLogo} onClick={onAddItem}>
          {
            tooltipContent ?
              <Tooltip content={tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
                {renderInnerAddItem()}
              </Tooltip> :
              renderInnerAddItem()
          }
          </div>
        </div>
      </div>
    );
  }
}

AddItem.propTypes = {
  onClick: PropTypes.func,
  aspectRatio: PropTypes.oneOf(['3/4','16/9']),
  height: PropTypes.number,
  /** Content of the tooltip */
  tooltipContent: PropTypes.string
};

export default AddItem;
