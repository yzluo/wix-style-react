import React from 'react';
import {any, oneOf, string} from 'prop-types';
import style from './Avatar.st.css';
import omit from 'lodash/omit';
import Text from '../Text';
import Heading from '../Heading';
// import User from 'wix-style-react/new-icons/User';

export const SIZES = {
  tiny: 'tiny',
  xxSmall: 'xxSmall',
  xSmall: 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'xLarge',
  xxLarge: 'xxLarge'
};

export const STATES = {
  initials: 'initials',
  image: 'image',
  placeholder: 'placeholder',
  custom: 'custom'
};

export const COLORS = {
  blue: 'blue',
  green: 'green',
  gray: 'gray',
  red: 'red',
  orange: 'orange',
  custom: 'custom'
};

const getTextBySize = (size, text) => {
  switch (size) {
    case SIZES.xSmall:
    case SIZES.small:
      return (
        React.createElement(
          Heading,
          {
            ...style('initials', {size}),
            appearance: 'H6',
            'data-hook': 'initials'
          },
          text
        ));
    case SIZES.medium:
    case SIZES.large:
      return (
        React.createElement(
          Text,
          {
            ...style('initials', {size}),
            light: true,
            size: 'small',
            weight: 'bold',
            'data-hook': 'initials'
          },
          text
        ));
    case SIZES.xLarge:
    case SIZES.xxLarge:
      return (
        React.createElement(
          Text,
          {
            ...style('initials', {size}),
            light: true,
            size: 'medium',
            weight: 'bold',
            'data-hook': 'initials'
          },
          text
        ));
    case SIZES.tiny:
    case SIZES.xxSmall:
    default:
      return null;
  }
};

const getContent = (state, size, children) => {
  switch (state) {
    case STATES.initials:
      return getTextBySize(size, children);
    case STATES.placeholder:
      // return React.createElement(User, {...style('placeholder', {size}), 'data-hook': 'placeholder'});
      return (
        <div className={style.placeholder} data-hook="placeholder">
          <div className={style['placeholder-head']}/>
          <div className={style['placeholder-body']}/>
        </div>
      );
    case STATES.custom:
      return children;
    case STATES.image:
    default:
      return '';
  }
};


const Avatar = ({size, state, color, children, imageUrl, customColor, ...rest}) => {
  return (
    React.createElement(
      'div',
      {
        ...omit(rest, ['dataHook']),
        ...style(
          'root',
          {
            size,
            state,
            color
          },
          rest
        ),
        style: {
          backgroundImage: (state === STATES.image && `url(${imageUrl})`) || (color === COLORS.custom && state !== STATES.placeholder && customColor),
          backgroundColor: (color === COLORS.custom && state !== STATES.placeholder && customColor)
        }
      },
      getContent(state, size, children)
    )
  );
};

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  /** size of the avatar */
  size: oneOf(Object.keys(SIZES)),

  /** content of the avatar */
  state: oneOf(Object.keys(STATES)),

  /** color of the avatar */
  color: oneOf(Object.keys(COLORS)),

  /** url of the avatar image */
  imageUrl: string,

  /** cutom color for state initials */
  customColor: string,

  /** any nodes to be rendered (usually text nodes) */
  children: any
};

Avatar.defaultProps = {
  size: SIZES.medium,
  state: STATES.initials,
  color: COLORS.blue
};

export default Avatar;
