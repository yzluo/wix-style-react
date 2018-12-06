import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

import Heading from '../Heading';
import Button from '../Button';

class Counter extends React.PureComponent {
  static displayName = 'Counter';

  static propTypes = {
    dataHook: PropTypes.string,

    /** The initial count */
    initialCount: PropTypes.number,
    /** Callback funtion to be called when the count has been changed. Signature is `onCountUpdate(newCount)`. */
    onCountUpdate: PropTypes.func,
    /** Text for the increment button */
    incrementText: PropTypes.string,
    /** Text for the decrement button */
    decrementText: PropTypes.string,

    /** Theme of the buttons */
    theme: Button.propTypes.theme,
  };

  static defaultProps = {
    initialCount: 0,
    onCountUpdate: () => {},
    incrementText: '+',
    decrementText: '-',
  };

  constructor(props) {
    super(props);

    this.state = {
      count: props.initialCount || 0,
    };
  }

  handleIncrement = () => {
    this.setState(
      ({ count }) => ({
        count: count + 1,
      }),
      () => {
        this.props.onCountUpdate(this.state.count);
      },
    );
  };

  handleDecrement = () => {
    this.setState(
      ({ count }) => ({
        count: count - 1,
      }),
      () => {
        this.props.onCountUpdate(this.state.count);
      },
    );
  };

  render() {
    const { count } = this.state;
    const { dataHook, incrementText, decrementText, theme } = this.props;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <Heading dataHook="counter-count">{count}</Heading>

        <div className={styles.buttons}>
          <Button
            onClick={this.handleDecrement}
            theme={theme}
            dataHook="counter-decrement"
          >
            {decrementText}
          </Button>
          <Button
            onClick={this.handleIncrement}
            theme={theme}
            dataHook="counter-increment"
          >
            {incrementText}
          </Button>
        </div>
      </div>
    );
  }
}

export default Counter;
