import React from 'react';
import { node, bool, string } from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';

import Text from '../../Text';
import Popover from '../../Popover';

import styles from './ToggleIcon.st.css';

class ToggleIcon extends React.Component {
  static displayName = 'SegmentedToggle.Icon';

  state = {
    shown: false,
  };

  open = () => {
    const { disabled } = this.props;
    this.setState({ shown: !disabled });
  };

  close = () => this.setState({ shown: false });

  static propTypes = {
    children: node,
    selected: bool,
    value: string,
    tooltipText: string,
    disabled: bool,
  };

  render() {
    const {
      children,
      selected,
      tooltipText,
      dataHook,
      focusableOnFocus,
      focusableOnBlur,
      onClick,
      ...rest
    } = this.props;

    const { shown } = this.state;

    return (
      <div data-hook={dataHook} className={styles.root}>
        <Popover
          showArrow
          shown={shown}
          onMouseEnter={() => this.open()}
          onMouseLeave={() => this.close()}
          theme="dark"
          appendTo="parent"
          placement="top"
          style={{ width: '100%' }}
        >
          <Popover.Element>
            <button
              {...rest}
              {...styles('button', { selected }, rest)}
              data-hook="toggle-icon"
              onClick={onClick}
              onFocus={focusableOnFocus}
              onBlur={focusableOnBlur}
            >
              {children}
            </button>
          </Popover.Element>
          <Popover.Content>
            <div className={styles.textWrapper}>
              <Text {...styles('text', { shown })} size="small" weight="normal">
                {tooltipText}
              </Text>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default withFocusable(ToggleIcon);
