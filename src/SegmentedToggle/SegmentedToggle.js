import React from 'react';
import { string, func, bool } from 'prop-types';

import styles from './SegmentedToggle.st.css';
import ToggleButton from './ToggleButton/ToggleButton';
import ToggleIcon from './ToggleIcon/ToggleIcon';

class SegmentedToggle extends React.Component {
  static displayName = 'SegmentedToggle';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used to create an testkit */
    dataHook: string,
    /** Sets default selected toggle */
    defaultSelected: string,
    /** Returns selected element and value `(evt, value)`  */
    onClick: func,
    /** Applies disabled styles and removes handlers  */
    disabled: bool,
  };

  state = {
    selected: this.props.defaultSelected,
  };

  _onClick = evt => {
    const { onClick } = this.props;
    const { value } = evt.currentTarget;
    this.setState({ selected: value }, () =>
      onClick && onClick(evt, value),
    );
  };

  render() {
    const {
      dataHook,
      children,
      disabled,
      defaultSelected,
      onClick,
      ...rest
    } = this.props;
    return (
      <div
        {...rest}
        data-hook={dataHook}
        {...styles('root', { disabled }, rest)}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            disabled,
            'data-click': `segmented-toggle-${index + 1}`,
            onClick: this._onClick,
            selected: child.props.value === this.state.selected,
          }),
        )}
      </div>
    );
  }
}

SegmentedToggle.Button = ToggleButton;
SegmentedToggle.Icon = ToggleIcon;

export default SegmentedToggle;
