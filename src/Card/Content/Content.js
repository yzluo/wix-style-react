import React, { Component } from 'react';
import { node } from 'prop-types';
import styles from './Content.scss';

class Content extends Component {
  static propTypes = {
    children: node,
  };

  render() {
    return <div className={styles.content}>{this.props.children}</div>;
  }
}

export default Content;
