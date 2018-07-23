import React from 'react';

import EndorseContentLayout from './EndorseContentLayout.driver';

describe('EndorseContentLayout', () => {
  let driver;

  beforeEach(() => (driver = new EndorseContentLayout()));

  it('should render', () => {
    driver.when.created();
    expect(driver.get.root()).toHaveLength(1);
  });

  const componentsToRender = ['head', 'content', 'primaryCta', 'secondaryCta'];

  it('should render children components from props', () => {
    componentsToRender.forEach(c => {
      driver.when.created({ [c]: <div>hey hope you render</div> });
      expect(driver.get[c]().text()).toBe('hey hope you render');
    });
  });

  it('should not render anything when prop not given', () => {
    componentsToRender.forEach(c => {
      driver.when.created();
      expect(driver.get[c]()).toHaveLength(0);
    });
  });
});
