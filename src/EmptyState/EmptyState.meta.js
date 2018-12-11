import Registry from '@ui-autotools/registry';
import EmptyState from '.';

const emptyStateMetadata = Registry.getComponentMetadata(EmptyState);

emptyStateMetadata.addSim({
  title: 'Normal example',
  props: {
    theme: 'page',
    title: 'Title!'
  }
});
