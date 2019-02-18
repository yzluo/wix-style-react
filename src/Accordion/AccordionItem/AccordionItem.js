import React from 'react';
import styles from './AccordionItem.scss';
import { Animator } from 'wix-animations';
import Text from '../../Text';
import MoreLessButton from '../MoreLessButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AccordionItem extends React.PureComponent {
  static displayName = 'AccordionItem';

  static propTypes = {
    dataHook: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    expandLabel: PropTypes.string,
    collapseLabel: PropTypes.string,
    content: PropTypes.node,
    icon: PropTypes.node,
    isOpen: PropTypes.bool,
    toggleOpenClose: PropTypes.func,
  };

  state = {
    hover: false,
  };

  toggleHoverOut = () => {
    this.setState({ hover: false });
  };
  toggleHoverIn = () => {
    this.setState({ hover: true });
  };

  render() {
    const { hover } = this.state;
    const {
      dataHook,
      icon,
      title,
      toggleOpenClose,
      expandLabel,
      collapseLabel,
      isOpen,
      content,
      id,
    } = this.props;
    const buttonsStyle = classNames(styles.moreLessButton, {
      isOpen: styles.isOpen,
    });
    const itemStyle = classNames(styles.item, {
      [styles.open]: isOpen,
    });
    return (
      <div
        className={styles.wrapper}
        data-hook={dataHook}
        onMouseEnter={this.toggleHoverIn}
        onMouseLeave={this.toggleHoverOut}
      >
        <div className={itemStyle}>
          {icon && (
            <div className={styles.headerIcon} data-hook="icon">
              {icon}
            </div>
          )}
          {title && <Text data-hook="title">{title}</Text>}
        </div>
        <div className={buttonsStyle}>
          <MoreLessButton
            dataHook="toggle-accordion-wrapper"
            isOpen={isOpen}
            handleClick={() => toggleOpenClose(id)}
            expandLabel={expandLabel}
            collapseLabel={collapseLabel}
          />
        </div>
        <Animator show={isOpen} height>
          <div data-hook="content" className={styles.collapse}>
            {content}
          </div>
        </Animator>
      </div>
    );
  }
}

export default AccordionItem;
