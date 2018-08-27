import React from 'react';
import {bool, node} from 'prop-types';
import classNames from 'classnames';

import Content from './Content';
import Header from './Header';
import LinkHeader from './LinkHeader';
import ButtonHeader from './ButtonHeader';
import CollapsedHeader from './CollapsedHeader';
import EmptyState from './EmptyState';

import styles from './Card.scss';

const Card = ({stretchVertically, children}) =>
  <div
    className={classNames(
      styles.card,
      {
        [styles.stretchVertically]: stretchVertically
      }
    )}
    children={children}
    />;

Card.displayName = 'Card';

Card.propTypes = {
  children: node,
  stretchVertically: bool
};

Card.defaultProps = {
  stretchVertically: false
};

Card.Content = Content;
Card.Header = Header;
Card.LinkHeader = LinkHeader;
Card.ButtonHeader = ButtonHeader;
Card.CollapsedHeader = CollapsedHeader;
Card.EmptyState = EmptyState;

export default Card;
