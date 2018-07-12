import * as React from 'react';
import {Component} from 'react'; // eslint-disable-line no-duplicate-imports
import {node} from 'prop-types';
import styles from './Content.scss';

class Content extends Component {

  static propTypes = {
    children: node
  };

  render() {
    return (
      <div className={styles.content}>
        {this.props.children}
      </div>
    );
  }
}

export default Content;
