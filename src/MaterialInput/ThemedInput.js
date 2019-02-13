import React from 'react';
import classNames from 'classnames';
import Input from '../Input/Input';

import styles from './MaterialInput.scss';

class ThemedInput extends React.Component {
  state = {
    focus: false
  };

  render() {
    const {
      id,
      size,
      dataHook,
      title,
      rtl,
      disabled,
      status,
      statusMessage,
      forceHover,
      forceFocus,
      className,
      value,
      withSelection,
    } = this.props;

    let hasError = status === Input.StatusError;

    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: hasError,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.hasValue]:
        (value && value.length) || (this.input && !!this.input.value),
    };

    return (
      <div
        className={classNames(
          classes,
          styles.root,
          styles[`theme-amaterial`],
          styles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
        )}
        data-hook={dataHook}
      >
        <label className={styles.materialTitle} htmlFor={id}>{title}</label>
        <Input {...this.props}/>
        <div className={`${styles.bar} ${styles.barBlue}`} />
        <div>{statusMessage}</div>
      </div>
    );
  }
}

export default ThemedInput;
