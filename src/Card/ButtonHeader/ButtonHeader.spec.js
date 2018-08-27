import {mount} from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import {buttonHeaderTestkitFactory, buttonTestkitFactory} from '../../../testkit';
import {buttonHeaderTestkitFactory as enzymeButtonHeaderTestkitFactory} from '../../../testkit/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import ButtonHeader from './ButtonHeader';
import buttonHeaderDriverFactory from './ButtonHeader.driver';


describe('ButtonHeader', () => {
  const createDriver = createDriverFactory(buttonHeaderDriverFactory);

  it('should have a title', () => {
    const driver = createDriver(<ButtonHeader buttonOnClick={() => {}} buttonTitle="Click me" title="Header Title"/>);
    expect(driver.title()).toBe('Header Title');
  });

  it('should have a subtitle', () => {
    const driver = createDriver(<ButtonHeader buttonOnClick={() => {}} buttonTitle="Click me" subtitle="Header Subtitle" title="Header Title"/>);
    expect(driver.subtitle()).toBe('Header Subtitle');
  });

  it('should have a button testKit', () => {
    const driver = createDriver(<ButtonHeader buttonOnClick={() => {}} buttonTitle="Click me" subtitle="Header Subtitle" title="Header Title"/>);
    const buttonDriverTestkit = buttonTestkitFactory({wrapper: driver.element(), dataHook: driver.buttonDataHook()});
    expect(buttonDriverTestkit.getButtonTextContent()).toBe('Click me');
  });

  it('should click on button', () => {
    const onClick = sinon.spy();

    const driver = createDriver(<ButtonHeader buttonOnClick={onClick} buttonTitle="Click me" subtitle="Header Subtitle" title="Header Title"/>);

    driver.click();

    expect(onClick.calledOnce).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><ButtonHeader buttonOnClick={() => {}} buttonTitle="Click me" title="Header Title" dataHook={dataHook}/></div>));
      const buttonHeaderTestkit = buttonHeaderTestkitFactory({wrapper, dataHook});
      expect(buttonHeaderTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<ButtonHeader buttonOnClick={() => {}} buttonTitle="Click me" title="Header title" dataHook={dataHook}/>);
      const buttonDriverTestkit = enzymeButtonHeaderTestkitFactory({wrapper, dataHook});
      expect(buttonDriverTestkit.exists()).toBeTruthy();
    });
  });
});
