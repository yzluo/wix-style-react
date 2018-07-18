import React from 'react';
import {oneOf, bool} from 'prop-types';
import {Text as CoreText} from 'wix-ui-backoffice/dist/src/components/core/CoreText';
import style from './Text.st.css';
import deprecationLog from '../utils/deprecationLog';

export const SIZES = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium'
};

export const SKINS = {
  standard: 'standard',
  error: 'error',
  success: 'success',
  premium: 'premium'
};

export const WEIGHTS = {
  thin: 'thin',
  normal: 'normal',
  bold: 'bold'
};

const Text = ({size, secondary, skin, light, bold, weight, ...rest}) => {
  if (bold !== undefined) {
    deprecationLog('Text prop "bold" is deprecated, use "weight" prop instead');
  } else {
    bold = false;
  }

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
          weight,
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

  /** font weight of the text */
  weight: oneOf(Object.keys(WEIGHTS)),

  /** is the text bold */
  bold: bool
};

Text.defaultProps = {
  size: SIZES.medium,
  secondary: false,
  skin: SKINS.standard,
  light: false,
  weight: WEIGHTS.normal
};

export default Text;
