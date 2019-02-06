import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormFieldSpinnerUp from 'wix-ui-icons-common/system/FormFieldSpinnerUp';
import FormFieldSpinnerDown from 'wix-ui-icons-common/system/FormFieldSpinnerDown';
import styles from './Ticker.scss';

export const Ticker = ({
  onUp,
  onDown,
  upDisabled,
  downDisabled,
  dataHook,
}) => (
  <div className={styles.root} data-hook={dataHook}>
    <div
      className={classnames(styles.up, { [styles.disabled]: upDisabled })}
      onClick={upDisabled ? null : onUp}
    >
      <FormFieldSpinnerUp />
    </div>
    <div
      className={classnames(styles.down, { [styles.disabled]: downDisabled })}
      onClick={downDisabled ? null : onDown}
    >
      <FormFieldSpinnerDown />
    </div>
  </div>
);

const TickerDeprecated = props => <Ticker dataHook="ticker" {...props} />;

TickerDeprecated.displayName = 'Input.Ticker';

TickerDeprecated.propTypes = {
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  upDisabled: PropTypes.bool,
  downDisabled: PropTypes.bool,
};

export default TickerDeprecated;
