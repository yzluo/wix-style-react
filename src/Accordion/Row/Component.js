import React from 'react';
import styles from './row.scss';
import {Animator} from 'wix-animations';
import Text from '../../Text';
import MoreLessButton from '../MoreLessButton';
import PropTypes from "prop-types";

class Row extends React.PureComponent {

  static displayName = 'Row';

  static propTypes = {
    dataHook: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    moreLabel: PropTypes.string,
    lessLabel: PropTypes.string,
    content: PropTypes.node,
    icon: PropTypes.node,
    open: PropTypes.bool,
    toggleView: PropTypes.func,
  };

  static defaultProps = {
    moreLabel: 'More',
    lessLabel: 'Less',
  };

  state = {
    hover: false,
  }

  toggleHoverOut = () => {
    this.setState({ hover: false });
  }
  toggleHoverIn = () => {
    this.setState({ hover: true });
  }

  render() {
    const {hover} = this.state;
    const {
      dataHook,
      icon,
      title,
      toggleView,
      moreLabel,
      lessLabel,
      open,
      content,
      id
    } = this.props;
    return (
      <div
        className={styles.wrapper}
        data-hook={dataHook}
        onMouseEnter={this.toggleHoverIn}
        onMouseLeave={this.toggleHoverOut}
      >
        <div className={styles.row}>
          {icon && <div className={styles.headerIcon} data-hook="icon">{icon}</div>}
          {title && <Text data-hook="title">{title}</Text>}
        </div>
        <div className={`${styles.moreLessButton} ${open ? styles.open : ''}`}>
          <MoreLessButton
            expend={hover}
            open={open}
            onClickHandler={() => toggleView(id)}
            dataHook={dataHook}
            moreLabel={moreLabel}
            lessLabel={lessLabel}
          />
        </div>
        <Animator show={open} height>
          <div data-hook="content" className={styles.collapse}>{content}</div>
        </Animator>
      </div>
    );
  }
}

export default Row;
