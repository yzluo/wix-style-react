import { pxDivide } from './utils';

const pallete = {
  main: '#3899ec', //B10
  mainHover: '#4eb7f5', //B20
  notifications: '#c1e4fe', //B30
  dividers: '#eaf7ff', //B50
  danger: '#ee5951', //R10
  dangerHover: '#ff6666', //R20
  mainInputText: '#162d3d',
  disabled: '#cbd3dc', //D55
  white: '#ffffff', //D80
};

const heightMap = {
  small: '30px',
  medium: '36px',
  large: '42px',
};

const paddingMap = {
  small: '0 17px',
  medium: '0 23px',
  large: '0 29px',
};

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '20px',
};

const lineHeightMap = {
  small: '18px',
  medium: '24px',
  large: '24px',
};

const skinToColorMap = {
  standard: pallete.white,
  danger: pallete.white,
  emptyStandard: pallete.main,
};

const skinToBackgroundMap = {
  standard: pallete.main,
  danger: pallete.danger,
  emptyStandard: pallete.white,
};

const skinToBorderColorMap = {
  standard: pallete.main,
  danger: pallete.danger,
  emptyStandard: pallete.main,
};

const skinToHoverColorMap = {
  standard: pallete.white,
  danger: pallete.white,
  emptyStandard: pallete.white,
};

const skinToHoverBackgroundMap = {
  standard: pallete.mainHover,
  danger: pallete.dangerHover,
  emptyStandard: pallete.mainHover,
};

const skinToHoverBorderColorMap = {
  standard: pallete.mainHover,
  danger: pallete.dangerHover,
  emptyStandard: pallete.mainHover,
};

export const button = {
  fontSize: ({ height }) => fontSizeMap[height],
  lineHeight: ({ height }) => lineHeightMap[height],

  height: ({ height }) => heightMap[height],
  padding: ({ height }) => paddingMap[height],
  borderRadius: ({ height }) => pxDivide(heightMap[height], 2),

  color: ({ skin }) => skinToColorMap[skin],
  backgroundColor: ({ skin }) => skinToBackgroundMap[skin],
  borderColor: ({ skin }) => skinToBorderColorMap[skin],

  hover: {
    color: ({ skin }) => skinToHoverColorMap[skin],
    backgroundColor: ({ skin }) => skinToHoverBackgroundMap[skin],
    borderColor: ({ skin }) => skinToHoverBorderColorMap[skin],
  },

  disabled: {
    color: 'black',
    backgroundColor: pallete.disabled,
    borderColor: pallete.disabled,
  },
};

export const input = {
  color: pallete.mainInputText,
  borderColor: pallete.notifications,
  backgroundColor: pallete.white,
  borderRadius: ({ roundInput }) => (roundInput ? '18px' : '6px'),
  fontSize: '16px',
  padding: '0 12px',
  height: '30px',

  hover: {
    backgroundColor: pallete.dividers,
  },

  focus: {
    boxShadow: 'none',
    borderColor: pallete.mainHover,
  },
};

export default {
  button,
  input,
};
