import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Avatar as CoreAvatar } from 'wix-ui-core/avatar';
import { avatar as avatarStyle } from 'wix-ui-core/themes/backoffice';

import style from './Avatar.st.css';
import { capitalize } from '../utils/cssClassUtils';

/**
 * Avatar is a type of element that visually represents a user, either as an image, icon or text.
 *
 * <p>There are 3 props for corresponding content types: `text`, `icon` and `imgProps`.
 * If more than one of these props is supplied (with `name` prop giving default value to the `text` prop),
 * then the resolved content type for display goes according to this priority: image -> icon -> text.
 */
const Avatar = props => {
  const { size, color, dataHook, className, ...rest } = props;

  return (
    <CoreAvatar
      {...rest}
      data-hook={dataHook}
      className={classNames(
        className,
        avatarStyle(size, color && `color${capitalize(color)}`),
      )}
    />
  );
};

const CoreAvatarPropTypes = {
  /* The name of the avatar user. Text initials will be generated from the name. And it will be used as default value for html `title` and `aria-label` attributes. */
  name: PropTypes.string,
  /* Text to render as content. */
  text: PropTypes.string,
  /* A node with a placeholder to be rendered as content. Will be displayed if no `text`, `name` or `imgProps` are provided. */
  placeholder: PropTypes.node,
  /* Props for an <img> tag to be rendered as content. */
  imgProps: PropTypes.object,
};
Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  ...CoreAvatarPropTypes,
  size: PropTypes.oneOf([
    'size90',
    'size72',
    'size60',
    'size48',
    'size36',
    'size30',
    'size24',
    'size18',
  ]),
  /* Bakcground color when text (initials) content is displayed */
  color: PropTypes.oneOf(['blue', 'green', 'grey', 'red', 'orange']),
  /* classes to be applied to the root elemenet */
  className: PropTypes.string,
  /* Applied as data-hook HTML attribute that can be used to create an Avatar driver in testing */
  dataHook: PropTypes.string,
};

Avatar.defaultProps = {
  placeholder: (
    <svg
      className={style.placeholder}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path d="M40,46.6666667 C40,39.827681 35.7091909,33.9908675 29.6727884,31.7014418 C32.67293,29.8137334 34.6666667,26.4730311 34.6666667,22.6666667 C34.6666667,16.7756293 29.8910373,12 24,12 C18.1089627,12 13.3333333,16.7756293 13.3333333,22.6666667 C13.3333333,26.4730311 15.32707,29.8137334 18.3272116,31.7014418 C12.2908091,33.9908675 8,39.827681 8,46.6666667 L8,48 L40,48 L40,46.6666667 Z" />
    </svg>
  ),
};

export default Avatar;
