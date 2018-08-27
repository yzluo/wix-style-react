import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import s from './ProgressBar.scss';
import Typography from '../../Typography';

class ProgressBar extends WixComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={s['progress-bar']}>
        <span className={Typography.t5}>{`${this.props.progress}%`}</span>
        <span className={s.bar}>
          <span className={s['bar-value']} style={{width: this.props.progress + '%'}}/>
          <span className={s['bar-leftover']} style={{width: (100 - this.props.progress) + '%'}}/>
        </span>
      </div>
    );
  }
}

export default ProgressBar;
