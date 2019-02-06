import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberInput.scss';

import Input from '../Input/Input';

class NumberInput extends React.PureComponent {
  static displayName = 'NumberInput';

  _onChange = e => {
    const { value, onChange } = this.props;
  };

  render() {
    const { dataHook, value } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <Input type="number" value={value} suffix={<Input.Ticker />} />
      </div>
    );
  }
}

NumberInput.propTypes = {
  dataHook: PropTypes.string,

  /** Number value for the input */
  value: PropTypes.number,
  /** Callback to handle value changes */
  onChange: PropTypes.func,
  /** Minimum value for input */
  min: PropTypes.number,
  /** Maximum value for input */
  max: PropTypes.number,
  /** Step for each ticker click  */
  step: PropTypes.number,
};

NumberInput.defaultProps = {
  buttonText: 'Click me!',
};

export default NumberInput;
