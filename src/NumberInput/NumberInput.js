import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberInput.scss';

import Input from '../Input/Input';

class NumberInput extends React.PureComponent {
  static displayName = 'NumberInput';

  increment = () => {
    const { value, onChange } = this.props;
    onChange((value + 1).toString());
  };

  render() {
    const { dataHook, value, onChange } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <Input
          type="number"
          value={value}
          onChange={onChange}
          suffix={
            <Input.Ticker
              onUp={this.increment}
              dataHook="number-input-ticker"
            />
          }
        />
      </div>
    );
  }
}

NumberInput.propTypes = {
  ...Input.propTypes,
  /** Minimum value for input */
  min: PropTypes.number,
  /** Maximum value for input */
  max: PropTypes.number,
  /** Step for each ticker click  */
  step: PropTypes.number,
};

export default NumberInput;
