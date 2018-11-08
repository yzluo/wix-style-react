import Tag from 'wix-style-react/Tag';

export default {
  category: '12. Other',
  storyName: '12.5 Tag',

  component: Tag,
  componentPath: '../src/Tag',
  componentProps: {
    children: 'Hello World',
    dataHook: 'story-tag',
    useOldMargins: false,
  },
  exampleProps: {
    onRemove: id => `ID: ${id} Removed!`,
    onClick: id => `ID: ${id} Clicked!`,
  },
};
