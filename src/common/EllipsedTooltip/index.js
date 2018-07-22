import React from 'react';
import {node, bool} from 'prop-types';
import shallowequal from 'shallowequal';
import {Tooltip} from 'wix-ui-core/Tooltip';
import style from './EllipsedTooltip.st.css';
import {getDisplayName} from '../hocUtils';

class EllipsedTooltip extends React.Component {
  static propTypes = {
    component: node.isRequired,
    showTooltip: bool
  };

  static defaultProps = {showTooltip: true};

  state = {isEllipsisActive: false};

  componentDidMount() {
    this._updateEllipsisState();
  }

  componentDidUpdate(prevProps) {
    // if props changed, then we want to re-check node for ellipsis state
    // and we can not do such check in render, because we want to check already rendered node
    if (!shallowequal(prevProps, this.props)) {
      this._updateEllipsisState();
    }
  }

  _updateEllipsisState = () => {
    this.setState({
      isEllipsisActive: this.textNode && this.textNode.offsetWidth < this.textNode.scrollWidth
    });
  };

  _renderText() {
    const {component} = this.props;

    return React.cloneElement(
      component,
      {
        ...style('root', {}, this.props.component.props),
        style: {whiteSpace: 'nowrap'},
        forwardedRef: node => this.textNode = node
      }
    );
  }

  render() {
    if (!this.state.isEllipsisActive || !this.props.showTooltip) {
      return this._renderText();
    }

    return (
      <Tooltip
        {...style('root')}
        appendTo="scrollParent"
        content={<div className={style.tooltipContent}>{this.props.component.props.children}</div>}
        showArrow
        >
        {this._renderText()}
      </Tooltip>
    );
  }
}

export const withEllipsedTooltip = ({showTooltip} = {}) => Comp => {
  const WrapperComponent = props => (
    <EllipsedTooltip
      component={React.createElement(Comp, props)}
      showTooltip={showTooltip}
      />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
