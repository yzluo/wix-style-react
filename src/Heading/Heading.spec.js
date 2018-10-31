import React from 'react';
import headingDriverFactory from './Heading.driver';
import Heading from './Heading';
import {createUniDriverFactory} from 'wix-ui-test-utils/uni-driver-factory';
import {isUniEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isUniTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';
import {headingTestkitFactory} from '../../testkit';
import {headingTestkitFactory as enzymeHeadingTestkitFactory} from '../../testkit/enzyme';

describe('Heading', () => {
  const createDriver = createUniDriverFactory(headingDriverFactory);

  describe('light prop', () => {
    it('should be dark by default', async () => {
      const wrapper = createDriver(<Heading>Hello</Heading>);
      expect(await wrapper.isLight()).toBe(false);
    });

    it('should be light', async () => {
      const wrapper = createDriver(<Heading light>Hello</Heading>);
      expect(await wrapper.isLight()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', async () => {
      expect(await isUniTestkitExists(<Heading>Hello World</Heading>, headingTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', async () => {
      expect(await isUniEnzymeTestkitExists(<Heading>Hello World</Heading>, enzymeHeadingTestkitFactory, mount)).toBe(true);
    });
  });
});
