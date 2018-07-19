import React from 'react';
import {node, bool} from 'prop-types';
import shallowequal from 'shallowequal';
import {Tooltip} from 'wix-ui-backoffice/Tooltip';
import style from './EllipsedTooltip.st.css';
import {getDisplayName} from '../hocUtils';

const isEllipsisActive = node => node && node.offsetWidth < node.scrollWidth;

class EllipsedTooltip extends React.Component {
  static propTypes = {
    component: node.isRequired,
    showTooltip: bool
  };

  static defaultProps = {
    showTooltip: true
  };

  state = {
    isEllipsisActive: false
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateEllipsesState);
    this.updateEllipsesState();
  }

  componentDidUpdate(prevProps) {
    // if props changed, then we want to re-check node for ellipsis state
    // and we can not do such check in render, because we want to check already rendered node
    if (!shallowequal(prevProps, this.props)) {
      this.updateEllipsesState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateEllipsesState);
  }

  updateEllipsesState = () => {
    clearTimeout(this.ellipsesTimeout);
    this.ellipsesTimeout = setTimeout(() => {
      this.setState({isEllipsisActive: isEllipsisActive(this.textNode)});
    }, 30);
  };

  renderText({ellipsis}) {
    const {component} = this.props;

    return React.cloneElement(
      component,
      {
        ...style('root', {ellipsis}, this.props),
        forwardedRef: node => this.textNode = node
      }
    );
  }

  render() {
    if (!this.state.isEllipsisActive || !this.props.showTooltip) {
      return this.renderText({ellipsis: false});
    }

    return (
      <Tooltip content={this.props.component.props.children}>
        {this.renderText({ellipsis: true})}
      </Tooltip>
    );
  }
}

export const withEllipsedTooltip = ({showTooltip} = {}) => Comp => props => {
  EllipsedTooltip.displayName = getDisplayName(Comp);

  return (
    <EllipsedTooltip
      component={React.createElement(Comp, props)}
      showTooltip={showTooltip}
      />
  );
};
