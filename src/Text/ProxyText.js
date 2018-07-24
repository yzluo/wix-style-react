import React from 'react';
import {bool} from 'prop-types';
import {createHOC} from 'wix-ui-core/dist/src/createHOC';
import Text from './Text';
import {withEllipsedTooltip} from '../common/EllipsedTooltip/core';
import style from '../common/EllipsedTooltip/EllipsedTooltip.st.css';

const EllipsedText = withEllipsedTooltip({showTooltip: true})(Text);

const ProxyText = ({ellipsis, ...props}) => ellipsis ?
  <EllipsedText {...style('root', {}, ...props)} {...props}/> :
  <Text {...props}/>;

ProxyText.propTypes = {
  ...Text.propTypes,

  /** should the text get ellipsed with tooltip, or should it get broken into lines when it reaches the end of its container */
  ellipsis: bool
};

ProxyText.displayName = 'Text';

export default createHOC(ProxyText);
