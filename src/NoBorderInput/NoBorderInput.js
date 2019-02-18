import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'omit';

import Input from '../Input/Input';
import inputStyles from '../Input/Input.scss';
import styles from './NoBorderInput.scss';

class NoBorderInput extends React.Component {
  constructor() {
    super();
    this.state = {
      focus: false,
    };
  }

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
      helpMessage,
      forceHover,
      forceFocus,
      className,
      value,
      withSelection,
    } = this.props;

    const rejectedProps = [
      'theme',
      'prefix',
      'className',
      'help',
      'helpMessage',
      'statusMessage',
      'error',
      'errorMessage',
      'roundInput',
      'noLeftBorderRadius',
      'noRightBorderRadius',
    ];
    const wsrInputProps = omit(rejectedProps, this.props);

    const hasValue =
      (value && value.length) ||
      (this.wsrInput && this.wsrInput.input && !!this.wsrInput.input.value);
    const conditionalClasses = {
      [inputStyles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: status === Input.StatusError,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.hasValue]: hasValue,
    };
    const statusClass =
      status && statusMessage ? styles.errorMessage : styles.helpMessage;
    const statusText = status && statusMessage ? statusMessage : helpMessage;

    const renderStatusLine = () =>
      !disabled && (
        <div className={classNames(statusClass, styles.message)}>
          {statusText}
        </div>
      );

    return (
      <div
        className={classNames(
          conditionalClasses,
          styles.root,
          inputStyles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
        )}
        data-hook={dataHook}
      >
        <label className={styles.label} htmlFor={id}>
          {title}
        </label>
        <Input
          className={styles.nbinput}
          {...wsrInputProps}
          ref={wsrInput => (this.wsrInput = wsrInput)}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
        />
        <div className={classNames(styles.bar, styles.barBlue)} />
        {renderStatusLine()}
      </div>
    );
  }
}

NoBorderInput.displayName = 'NoBorderInput';

NoBorderInput.defaultProps = {
  autoSelect: false,
  size: 'normal',
  statusMessage: '',
  helpMessage: '',
  textOverflow: 'clip',
  maxLength: 524288,
};

NoBorderInput.propTypes = {
  ...Input.propTypes,

  /** Specifies the size of the input */
  // size: PropTypes.oneOf(['small', 'normal']),
};

// NoBorderInput.propTypes = {
//   ariaControls: PropTypes.string,
//   ariaDescribedby: PropTypes.string,
//   ariaLabel: PropTypes.string,

//   /** Standard React Input autoFocus (focus the element on mount) */
//   autoFocus: PropTypes.bool,

//   /** Standard React Input autoSelect (select the entire text of the element on focus) */
//   autoSelect: PropTypes.bool,

//   /** Sets value of autocomplete attribute (consult the [HTML spec](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete) for possible values  */
//   autocomplete: PropTypes.string,

//   /** Specifies a data-hook for tests */
//   dataHook: PropTypes.string,

//   /** Default value for those who wants to use this component un-controlled */
//   defaultValue: PropTypes.string,

//   /** when set to true this component is disabled */
//   disabled: PropTypes.bool,

//   /** Input status - use to display an status indication for the user. for example: 'error' or 'loading' */
//   status: PropTypes.oneOf([Input.StatusError, Input.StatusLoading]),

//   /** The status (error/loading) message to display under the input*/
//   statusMessage: PropTypes.node,

//   /** The help message to display under the input if no statusMessage */
//   helpMessage: PropTypes.node,

//   /** for debug */
//   forceFocus: PropTypes.bool,

//   /** for debug */
//   forceHover: PropTypes.bool,
//   id: PropTypes.string,

//   /** Input max length */
//   maxLength: PropTypes.number,

//   /** Should the component include a menu arrow */
//   menuArrow: PropTypes.bool,

//   /** A single CSS class name to be appended to the Input's wrapper element. */
//   className: PropTypes.string,

//   name: PropTypes.string,

//   /** Standard input onBlur callback */
//   onBlur: PropTypes.func,

//   /** Standard input onChange callback */
//   onChange: PropTypes.func,

//   /** Displays clear button (X) on a non-empty input and calls callback with no arguments */
//   onClear: PropTypes.func,
//   onCompositionChange: PropTypes.func,

//   /** Called when user presses -enter- */
//   onEnterPressed: PropTypes.func,

//   /** Called when user presses -escape- */
//   onEscapePressed: PropTypes.func,

//   /** Standard input onFocus callback */
//   onFocus: PropTypes.func,

//   /** Standard input onClick callback */
//   onInputClicked: PropTypes.func,

//   /** Standard input onKeyDown callback */
//   onKeyDown: PropTypes.func,
//   onKeyUp: PropTypes.func,

//   /** called when user pastes text from clipboard (using mouse or keyboard shortcut) */
//   onPaste: PropTypes.func,

//   /** The material design style floating label for input */
//   title: PropTypes.string,

//   /** Placeholder to display */
//   placeholder: PropTypes.string,

//   /** Component you want to show as the prefix of the input */
//   prefix: PropTypes.node,

//   /** Sets the input to readOnly */
//   readOnly: PropTypes.bool,

//   /** Flip the magnify glass image so it be more suitable to rtl */
//   rtl: PropTypes.bool,

//   /** Specifies the size of the input */
//   size: PropTypes.oneOf(['small', 'normal', 'large']),

//   /** Component you want to show as the suffix of the input */
//   suffix: PropTypes.node,

//   /** Standard component tabIndex */
//   tabIndex: PropTypes.number,

//   /** Text overflow behaviour */
//   textOverflow: PropTypes.string,

//   type: PropTypes.string,

//   /** Inputs value */
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   required: PropTypes.bool,
// };

export default NoBorderInput;
