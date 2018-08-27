import React from 'react';
import PropTypes from 'prop-types';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';
import classNames from 'classnames';

import WixComponent from '../BaseComponents/WixComponent';
import Tooltip from '../Tooltip';
import style from './AddItem.scss';

const DEFAULT_TOOLTIP_PROPS = {
  showDelay: 0,
  hideDelay: 0,
  theme: 'dark',
  align: 'center',
  placement: 'top'
};

const RATIO_CLASSES = {
  '16/9': style.ratio16x9,
  '3/4': style.ratio3x4,
  '4/3': style.ratio4x3,
  '1/1': style.ratio1x1
};

const renderInnerAddItem = () => (
  <div className={style.dashedBorder} >
    <AddMedia className={style.plusIcon} size="31px"/>
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
    const ratio = !height && RATIO_CLASSES[aspectRatio];
    const tooltipProps = {
      ...DEFAULT_TOOLTIP_PROPS,
      content: tooltipContent,
      ...this.props.tooltipProps
    };

    return (
      <div className={classNames(ratio, style.box)} style={{height}} >
        <div className={style.container} onClick={onClick} data-hook="add-container">
          {
            tooltipProps.content ?
              <Tooltip dataHook="add-tooltip" {...tooltipProps}>
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
  /** Function called upon click */
  onClick: PropTypes.func,
  /** The element's aspect ratio */
  aspectRatio: PropTypes.oneOf(Object.keys(RATIO_CLASSES)),
  /** Element's height - overrides the asspect ratio */
  height: PropTypes.number,
  /** Tooltip props, leave undefined for no tooltip */
  tooltipProps: PropTypes.shape(Tooltip.propTypes),
  /** Content of the tooltip, leave undefined for no tooltip */
  tooltipContent: PropTypes.string
};

AddItem.defaultProps = {
  aspectRatio: '1/1'
};

export default AddItem;
