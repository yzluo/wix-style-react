import React from 'react';
import {oneOf, bool} from 'prop-types';
import {Text as CoreText} from 'wix-ui-backoffice/dist/src/components/core/CoreText';
import style from './Text.st.css';

export const SIZES = {
  small: 'small',
  medium: 'medium'
};

export const SKINS = {
  standard: 'standard',
  error: 'error',
  success: 'success',
  premium: 'premium'
};

const Text = ({size, secondary, skin, light, bold, ...rest}) => {
  return (
    <CoreText
      {...rest}
      {...style(
        'root',
        {
          size,
          secondary,
          skin,
          light: light && skin === SKINS.standard,
          bold
        },
        rest
      )}
      />
  );
};

Text.displayName = 'Text';

Text.propTypes = {
  ...CoreText.propTypes,

  /** font size of the text */
  size: oneOf(Object.keys(SIZES)),

  /** is the text type is secondary. Affects the font color */
  secondary: bool,

  /** skin color of the text */
  skin: oneOf(Object.keys(SKINS)),

  /** is the text has dark or light skin */
  light: bool,

  /** is the text bold */
  bold: bool
};

Text.defaultProps = {
  size: SIZES.medium,
  secondary: false,
  skin: SKINS.standard,
  light: false,
  bold: false
};

export default Text;
