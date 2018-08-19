import React from 'react';
import {storiesOf} from '@storybook/react';

import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../README.md';
import TestsReadme from '../../docs/TESTS.md';
import Contribution from '../../docs/CONTRIBUTING.md';
import AddingStory from '../../docs/adding-story.md';
import TPA from '../../src/TPA/README.md';
import UsageWithoutYoshiReadme from '../../docs/usage-without-yoshi.md';
import AutodocsDocs from 'wix-storybook-utils/docs/usage.md';

import * as App from '../../src/Structure';
import {SideMenu, Page} from '../Structure/examples';


storiesOf('Introduction', module)
  .add('Getting started', () => <Markdown source={Readme}/>)
  .add('Testing', () => <Markdown source={TestsReadme}/>)
  .add('Contribution', () => <Markdown source={Contribution}/>)
  .add('TPA', () => <Markdown source={TPA}/>)
  .add('Usage Without Yoshi', () => <Markdown source={UsageWithoutYoshiReadme}/>)
  .add('Page Layout', () => (
    <App.Main>
      <App.Header>this is the header</App.Header>
      <App.Body>
        <App.Nav><SideMenu/></App.Nav>
        <App.Content><Page/></App.Content>
      </App.Body>
    </App.Main>
  ))
  .add('Documenting components (AutoDocs)', () =>
    <div>
      <Markdown source={AddingStory}/>
      <Markdown source={AutodocsDocs}/>
    </div>
  );
