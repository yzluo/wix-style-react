import React from 'react';
import avatarDriverFactory from './Avatar.driver';
import Avatar from './';
import {SIZES, COLORS, STATES} from './Avatar';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {avatarTestkitFactory} from '../../testkit';
import {avatarTestkitFactory as enzymeAvatarTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Avatar', () => {
  const createDriver = createDriverFactory(avatarDriverFactory);

  describe('size prop', () => {
    it(`should be ${SIZES.medium} by default`, () => {
      const wrapper = createDriver(<Avatar>lm</Avatar>);
      expect(wrapper.getSize()).toBe(SIZES.medium);
    });

    Object.keys(SIZES).forEach(size => {
      it(`should be ${size}`, () => {
        const wrapper = createDriver(<Avatar size={size}>lm</Avatar>);
        expect(wrapper.getSize()).toBe(size);
      });
    });
  });

  describe('color prop', () => {
    it(`should be ${COLORS.blue} by default`, () => {
      const wrapper = createDriver(<Avatar>lm</Avatar>);
      expect(wrapper.getColor()).toBe(COLORS.blue);
    });

    it(`should use customColor when ${COLORS.custom} used`, () => {
      const expectedCustomColor = 'black';
      const wrapper = createDriver(<Avatar color={COLORS.custom} customColor={expectedCustomColor}>lm</Avatar>);
      expect(wrapper.getCustomColor()).toBe(expectedCustomColor);
    });

    it(`should use gradient as customColor when ${COLORS.custom} used`, () => {
      const expectedCustomColor = 'linear-gradient(217deg, green, blue)';
      const wrapper = createDriver(<Avatar color={COLORS.custom} customColor={expectedCustomColor}>lm</Avatar>);
      expect(wrapper.getCustomColor()).toBe(expectedCustomColor);
    });

    Object.keys(COLORS).forEach(color => {
      it(`should be ${color}`, () => {
        const wrapper = createDriver(<Avatar color={color}>lm</Avatar>);
        expect(wrapper.getColor()).toBe(color);
      });
    });
  });

  describe('state prop', () => {
    it(`should be ${STATES.initials} by default`, () => {
      const wrapper = createDriver(<Avatar>lm</Avatar>);
      expect(wrapper.getState()).toBe(STATES.initials);
    });

    it(`should use imageUrl when ${STATES.image} used`, () => {
      const expectedImageUrl = 'www.image.com';
      const wrapper = createDriver(<Avatar state={STATES.image} imageUrl={expectedImageUrl}>lm</Avatar>);
      expect(wrapper.getImageUrl()).toBe(`url(${expectedImageUrl})`);
    });

    it(`should use a placeholder when ${STATES.placeholder} used`, () => {
      const wrapper = createDriver(<Avatar state={STATES.placeholder}>lm</Avatar>);
      expect(wrapper.isPlaceholder()).toBe(true);
    });

    Object.keys(STATES).forEach(state => {
      it(`should be ${state}`, () => {
        const wrapper = createDriver(<Avatar state={state}>lm</Avatar>);
        expect(wrapper.getState()).toBe(state);
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Avatar>Hello World</Avatar>, avatarTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Avatar>Hello World</Avatar>, enzymeAvatarTestkitFactory, mount)).toBe(true);
    });
  });
});
