import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import typography from '../Typography';

const EndorseContentLayout = ({ head, content, primaryCta, secondaryCta }) => (
  <div className={styles.root}>
    {head && (
      <div className={classnames(styles.head, typography.h1)}>{head}</div>
    )}
    {content && (
      <div className={classnames(styles.content, typography.t1)}>{content}</div>
    )}
    {primaryCta && <div className={styles.primaryCta}>{primaryCta}</div>}
    {secondaryCta && <div className={styles.secondaryCta}>{secondaryCta}</div>}
  </div>
);

EndorseContentLayout.propTypes = {
  head: PropTypes.node,
  content: PropTypes.node,
  primaryCta: PropTypes.node,
  secondaryCta: PropTypes.node,
};

export default EndorseContentLayout;
