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

const ratioClasses = {
  '16/9': style.ratio16x9,
  '3/4': style.ratio3x4,
  '4/3': style.ratio4x3,
  '1/1': style.ratio1x1
};

const defaultRatio = '1/1';

const renderInnerAddItem = () => (
  <div className={style.dashedBorder} >
    <div className={style.plusIcon}><AddMedia size="31px"/></div>
  </div>
);

class AddItem extends WixComponent {
  render() {
    const {
      onClick,
      height,
      tooltipContent,
      aspectRatio
    } = this.props;

    const ratio = height && ratioClasses[aspectRatio] ? ratioClasses[aspectRatio] : ratioClasses[defaultRatio];

    return (
      <div className={classNames(ratio, style.box)} style={{height}} >
        <div className={classNames(style.content, style.container)} data-hook="add-container">
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
      </div>
    );
  }
}

AddItem.propTypes = {
  /** Funciton called upon click */
  onClick: PropTypes.func,
  /** The elemnt's asspect ratio   */
  aspectRatio: PropTypes.oneOf(Object.keys(ratioClasses)),
  /** Element's height - overrides the asspect ratio */
  height: PropTypes.number,
  /** Content of the tooltip */
  tooltipContent: PropTypes.string
};

export default AddItem;
