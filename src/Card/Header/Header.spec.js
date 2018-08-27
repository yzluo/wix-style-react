import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import headerDriverFactory from './Header.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import Header from './Header';
import {headerTestkitFactory} from '../../../testkit';
import {headerTestkitFactory as enzymeHeaderTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Header', () => {
  const createDriver = createDriverFactory(headerDriverFactory);

  it('should have a title', () => {
    const driver = createDriver(<Header title="Header Title"/>);
    expect(driver.title()).toBe('Header Title');
  });

  it('should have a subtitle', () => {
    const driver = createDriver(<Header subtitle="Header Subtitle" title="Header Title"/>);
    expect(driver.subtitle()).toBe('Header Subtitle');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Header title="Header Title" dataHook={dataHook}/></div>));
      const headerTestkit = headerTestkitFactory({wrapper, dataHook});
      expect(headerTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Header title="Header title" dataHook={dataHook}/>);
      const headerDriverTestkit = enzymeHeaderTestkitFactory({wrapper, dataHook});
      expect(headerDriverTestkit.exists()).toBeTruthy();
    });
  });
});
