import React from 'react';
import {bool, node} from 'prop-types';
import classNames from 'classnames';

import WixComponent from '../BaseComponents/WixComponent';
import Content from './Content';
import Header from './Header';
import LinkHeader from './LinkHeader';
import ButtonHeader from './ButtonHeader';
import CollapsedHeader from './CollapsedHeader';

import styles from './Card.scss';

class Card extends WixComponent {
  static propTypes = {
    children: node,
    stretchVertically: bool
  };

  static defaultProps = {
    stretchVertically: false
  };

  render() {
    const cssClasses = classNames(
      styles.card,
      {
        [styles.stretchVertically]: this.props.stretchVertically
      }
    );

    return (
      <div className={cssClasses}>
        {this.props.children}
      </div>
    );
  }
}

Card.Content = Content;
Card.Header = Header;
Card.LinkHeader = LinkHeader;
Card.ButtonHeader = ButtonHeader;
Card.CollapsedHeader = CollapsedHeader;

export default Card;
