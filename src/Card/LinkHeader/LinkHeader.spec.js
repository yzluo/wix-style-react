import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import linkHeaderDriverFactory from './LinkHeader.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import LinkHeader from './LinkHeader';
import {linkHeaderTestkitFactory, textLinkTestkitFactory} from '../../../testkit';
import {linkHeaderTestkitFactory as enzymeButtonHeaderTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

describe('LinkHeader', () => {
  const createDriver = createDriverFactory(linkHeaderDriverFactory);

  it('should have a title', () => {
    const driver = createDriver(<LinkHeader linkTitle="Wix" linkTo="http://www.wix.com/" title="Header Title"/>);
    expect(driver.title()).toBe('Header Title');
  });

  it('should have a subtitle', () => {
    const driver = createDriver(<LinkHeader linkTitle="Wix" linkTo="http://www.wix.com/" title="Header Title" subtitle="Header Subtitle"/>);
    expect(driver.subtitle()).toBe('Header Subtitle');
  });

  it('should have a TextLink testKit', () => {
    const driver = createDriver(<LinkHeader linkTitle="Wix" linkTo="http://www.wix.com/" title="Header Title" subtitle="Header Subtitle"/>);
    const textLinkDriverTestkit = textLinkTestkitFactory({wrapper: driver.element(), dataHook: driver.linkDataHook()});
    expect(textLinkDriverTestkit.getContent()).toBe('Wix');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><LinkHeader linkTitle="Wix" linkTo="http://www.wix.com/" title="Header Title" subtitle="Header Subtitle" dataHook={dataHook}/></div>));
      const linkHeaderTestkit = linkHeaderTestkitFactory({wrapper, dataHook});
      expect(linkHeaderTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<LinkHeader linkTitle="Wix" linkTo="http://www.wix.com/" title="Header Title" subtitle="Header Subtitle" dataHook={dataHook}/>);
      const linkDriverTestkit = enzymeButtonHeaderTestkitFactory({wrapper, dataHook});
      expect(linkDriverTestkit.exists()).toBeTruthy();
    });
  });
});
