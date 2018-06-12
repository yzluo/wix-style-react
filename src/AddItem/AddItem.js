import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import Plus2 from '../Icons/dist/components/Plus2';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

class AddItem extends WixComponent {

  render() {

    let {
      onAddItem,
      height,
      tooltipContent,
      aspectRatio
    } = this.props;

    tooltipContent = tooltipContent || '';

    const tooltipCommonProps = {
      showDelay: 0,
      theme: 'dark',
      hideDelay: 0,
      align: 'center',
      placement: 'top'
    };
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
      <div className={classNames(ratio, style.box)}>
        <div className={classNames(style.content, style.container)} style={{height}} data-hook="add-container">
          <div data-hook="add-area" className={style.addLogo} onClick={onAddItem}>
            <Tooltip content={tooltipContent} disabled={!tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
              <div className={style.dashedBorder} >
                <div className={style.plusIcon}><Plus2 size="47px"/></div>
              </div>
            </Tooltip>
          </div>
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
