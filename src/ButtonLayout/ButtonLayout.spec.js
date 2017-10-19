import React from 'react';
import ButtonLayout from './ButtonLayout';
import {createDriverFactory} from '../test-common';
import buttonDriverFactory from './ButtonLayout.driver';
import {mount} from 'enzyme';
import {buttonLayoutTestkitFactory as enzymeButtonLayoutTestkitFactory} from '../../testkit/enzyme';
import {buttonLayoutTestkitFactory} from '../../testkit';
import ReactTestUtils from 'react-dom/test-utils';

const someDivWithLayout = (props = {}) => (
  <ButtonLayout {...props}>
    <div>
      abc
    </div>
  </ButtonLayout>
);

describe('ButtonLayout', () => {
  const createDriver = createDriverFactory(buttonDriverFactory);

  it('should wrap a native component with ButtonLayout', () => {
    const driver = createDriver(someDivWithLayout());

    expect(driver.exists()).toEqual(true);
    expect(driver.doesComponentHasClass('fullblue')).toEqual(true);
  });

  it('should preserve all existing properties of the element', () => {
    const href = 'http://www.wix.com';
    const driver = createDriver(
      <ButtonLayout>
        <a href={href}>
          abc
        </a>
      </ButtonLayout>
    );

    expect(driver.exists()).toEqual(true);
    expect(driver.getComponentAttribute('href')).toEqual(href);
  });

  it('should extend existing className of the element', () => {
    const driver = createDriver(
      <ButtonLayout>
        <div className="myClass">
          abc
        </div>
      </ButtonLayout>
    );

    expect(driver.exists()).toEqual(true);
    expect(driver.doesComponentHasClass('myClass')).toEqual(true);
  });

  it('should extend existing inline style of the element', () => {
    const driver = createDriver(
      <ButtonLayout>
        <div style={{color: 'red'}}>
          abc
        </div>
      </ButtonLayout>
    );

    expect(driver.exists()).toEqual(true);
    expect(driver.getComponentAttribute('style')).toContain('color: red;');
  });

  it('should wrap a custom component with ButtonLayout', () => {
    const CustomComponent = props => (
      <div {...props}>
        abc
      </div>
    );
    const driver = createDriver(
      <ButtonLayout>
        <CustomComponent/>
      </ButtonLayout>
    );

    expect(driver.exists()).toEqual(true);
    expect(driver.doesComponentHasClass('fullblue')).toEqual(true);
  });

  it('should bypass some styles', () => {
    const driver = createDriver(someDivWithLayout());

    expect(driver.exists()).toEqual(true);
    expect(driver.getComponentAttribute('style')).toContain('display: inline-block;');
  });

  describe('class', () => {
    it('should get disabled class', () => {
      const driver = createDriver(someDivWithLayout({disabled: true}));

      expect(driver.doesComponentHasClass('disabled')).toBeTruthy();
    });

    it('should have default "fullblue" style', () => {
      const driver = createDriver(someDivWithLayout());

      expect(driver.doesComponentHasClass('fullblue')).toBeTruthy();
    });

    it('should get "small" height class', () => {
      const height = 'small';
      const driver = createDriver(someDivWithLayout({height}));

      expect(driver.doesComponentHasClass(`heightsmall`)).toBeTruthy();
    });

    it('should get "large" height class', () => {
      const height = 'large';
      const driver = createDriver(someDivWithLayout({height}));

      expect(driver.doesComponentHasClass(`heightlarge`)).toBe(true);
    });

    it('should get custom style', () => {
      const theme = 'emptyblue';
      const driver = createDriver(someDivWithLayout({theme}));

      expect(driver.doesComponentHasClass(theme)).toBeTruthy();
      expect(driver.doesComponentHaveTheme(theme)).toBeTruthy();
    });

    it('should get "hover" class', () => {
      const driver = createDriver(someDivWithLayout({hover: true}));

      expect(driver.doesComponentHasClass('hover')).toBeTruthy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'dataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <ButtonLayout dataHook={dataHook}>
            <div/>
          </ButtonLayout>
        </div>));
      const buttonLayoutTestkit = buttonLayoutTestkitFactory({wrapper, dataHook});
      expect(buttonLayoutTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'dataHook';
      const wrapper = mount(
        <ButtonLayout dataHook={dataHook}>
          <div/>
        </ButtonLayout>);
      const buttonLayoutTestkit = enzymeButtonLayoutTestkitFactory({wrapper, dataHook});
      expect(buttonLayoutTestkit.exists()).toBeTruthy();
    });
  });
});
