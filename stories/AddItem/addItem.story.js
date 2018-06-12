import AddItem from 'wix-style-react/AddItem';

export default {
  category: '3. Inputs',
  storyName: '3.12 AddItem',

  component: AddItem,
  componentPath: '../../src/AddItem',

  componentProps: () => ({
    onAddItem: () => {},
    dataHook: 'storybook-addItem'
  })
};
