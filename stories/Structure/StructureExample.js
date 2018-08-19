import React from 'react';

import {Main, Header, Body, Nav, Content} from 'wix-style-react/Structure';
import {SideMenu, Page} from './examples';

export default () => (
  <Main>
    <Header>this is the header</Header>
    <Body>
      <Nav>
        <SideMenu/>
      </Nav>
      <Content>
        <Page/>
      </Content>
    </Body>
  </Main>
);
