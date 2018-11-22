import React from 'react';
import Registry from '@ui-autotools/registry';

// import EmptyState from '../../dist/src/EmptyState/EmptyState';

const EmptyState = props => <div>
  <h1>{window.document.body}</h1>
  </div>;

// const Registry = require('@ui-autotools/registry').default;
// const EmptyState = require('../../dist/src/EmptyState/EmptyState').default;

const emptyStateMetadata = Registry.getComponentMetadata(EmptyState);

emptyStateMetadata.addSim({
  title: 'Normal example',
  props: {
    theme: 'page',
    title: 'Yo I am a title bruh!'
  }
});
