import Heading from 'wix-style-react/Heading';

// TODO: autodocs doesn't see ellipsis and forceHideTitle props, because of this line in
// wix-ui-backoffice/src/components/Heading/Heading.tsx:34
// const StyledText = withStylable<CoreTextProps, Props>(
// issue https://github.com/wix/react-autodocs-utils/issues/5
const propify = value => ({label: value.toString(), value});
const bools = [false, true].map(propify);

export default {
  category: '1. Foundation',
  storyName: '1.3 Heading',
  component: Heading,
  componentPath: '../src/Heading',

  componentProps: {
    children: 'Hey there, good looking',
    forceHideTitle: false,
    light: false,
    ellipsis: false
  },

  exampleProps: {
    appearance: ['H1', 'H2', 'H3', 'H4'],
    forceHideTitle: bools,
    ellipsis: bools
  }
};
