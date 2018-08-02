import React from 'react';
import {oneOf, bool, string, any} from 'prop-types';
import style from './Text.st.css';
import deprecationLog from '../utils/deprecationLog';
import omit from 'lodash/omit';

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
  bold: 'bold',
  'x-bold': 'x-bold'
};

const isLegalTypography = ({size, weight}) => {
  switch (size) {
    case SIZES.tiny: return weight !== WEIGHTS.thin;
    case SIZES.small:
    case SIZES.medium: return weight !== WEIGHTS['x-bold'];
    default: return true;
  }
};

const Text = ({size, secondary, skin, light, bold, weight, tagName, children, ...rest}) => {
  if (bold !== undefined) {
    deprecationLog('Text prop "bold" is deprecated, use "weight" prop instead');
  } else {
    bold = false;
  }

  if (!isLegalTypography({size, weight})) {
    console.warn(`Text: props weight=${weight} and size=${size} is not compatible with the design system. Please make sure with your UX that this is what you really want`);
  }

  return (
    React.createElement(
      tagName,
      {
        ...omit(rest, ['dataHook']),
        ...style(
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
        )
      },
      children
    )
  );
};

Text.displayName = 'Text';

Text.propTypes = {
  /** tag name that will be rendered */
  tagName: string,

  /** font size of the text */
  size: oneOf(Object.keys(SIZES)),

  /** any nodes to be rendered (usually text nodes) */
  children: any,

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
  weight: WEIGHTS.thin,
  tagName: 'span'
};

export default Text;
