import React from 'react';
import PropTypes from 'prop-types';

import { backofficeTheme } from 'wix-ui-core/themes/backoffice';

export const WixStyleReact = ({ children }) => (
  <div className={backofficeTheme}>{children}</div>
);

WixStyleReact.propTypes = {
  children: PropTypes.node,
};

export default WixStyleReact;
