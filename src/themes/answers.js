import { pxDivide } from './utils';

const pallete = {
  main: '#3899ec', //B10
  mainHover: '#4eb7f5', //B20
  dividers: '#eaf7ff', //B50
  danger: '#d8504c', //R05
  dangerHover: '#ee5951', //R10
  white: '#ffffff', //D80
  attention: '#fb7d33',
  attentionHover: '#ff9a48',
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
  attention: pallete.white,
};

const skinToBackgroundMap = {
  standard: pallete.main,
  danger: pallete.danger,
  attention: pallete.attention,
};

const skinToBorderColorMap = {
  standard: pallete.main,
  danger: pallete.danger,
  attention: pallete.attention,
};

const skinToHoverColorMap = {
  standard: pallete.white,
  danger: pallete.white,
  attention: pallete.white,
};

const skinToHoverBackgroundMap = {
  standard: pallete.mainHover,
  danger: pallete.dangerHover,
  attention: pallete.attentionHover,
};

const skinToHoverBorderColorMap = {
  standard: pallete.mainHover,
  danger: pallete.dangerHover,
  attention: pallete.attentionHover,
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
};

export default {
  button,
};
