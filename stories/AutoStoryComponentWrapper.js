import React from 'react';
import PropTypes from 'prop-types';

import { WixStyleReact } from '../src/WixStyleReact';

export const AutoStoryComponentWrapper = ({ component }) => (
  <WixStyleReact>{component}</WixStyleReact>
);

AutoStoryComponentWrapper.propTypes = {
  component: PropTypes.node,
};
