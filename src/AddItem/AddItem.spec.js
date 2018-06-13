import React from 'react';
import {createDriverFactory, resolveIn} from '../test-common';
import {addItemTestkitFactory} from '../../testkit';
import {addItemTestkitFactory as enzymeAddItemTestkitFactory} from '../../testkit/enzyme';
import AddItem from './AddItem';
import addItemDriverFactory from './AddItem.driver';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {mount, shallow} from 'enzyme';

describe('AddItem', () => {

  const TOOLTIP_CONTENT = 'BLA BLA';
  const createDriver = createDriverFactory(addItemDriverFactory);
  let props, driver;
  let addItem;


  beforeEach(() => {
    document.body.innerHTML = '';
    addItem = jest.fn();
    props = {
      onClick: addItem,
      tooltipContent: TOOLTIP_CONTENT,
      width: 300,
      height: 400
    };

  });

  describe('when default scenario', () => {

    it('should trigger add item', () => {
      driver = createDriver(<AddItem {...props}/>);
      driver.click();
      expect(addItem).toBeCalled();
    });

  });

  describe('height and width', () => {

    it('should be added to style attribute when item is not present', () => {
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getHeight()).toEqual('400px');
      expect(driver.getWidth()).toEqual('300px');
    });

    it('should not add style attribute when width and height props are not passed', () => {
      props = {};
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getHeight()).toEqual('');
      expect(driver.getWidth()).toEqual('');
    });

  });

  describe('hide or show add item', () => {

    it('should have an Add item tooltip', () => {
      driver = createDriver(<AddItem {...props}/>);
      const TooltipDriver = driver.getTooltipDriver();
      TooltipDriver.mouseEnter();
      return resolveIn(50)
        .then(() => {
          expect(TooltipDriver.isShown()).toBeTruthy();
          expect(TooltipDriver.getContent()).toEqual(props.tooltipContent);
        });
    });

    it('should have an AddItem tooltip markup', () => {
      const wrapper = shallow(<AddItem {...props}/>);
      expect(wrapper.find('Tooltip').exists()).toBeTruthy();
    });

    it('should not have an AddItem tooltip markup', () => {
      const wrapper = shallow(<AddItem/>);
      expect(wrapper.find('Tooltip').exists()).toBeFalsy();
    });

    // it('should not have an Add item tooltip', () => {
    //   const wrapper = shallow(<AddItem/>);
    //   expect(wrapper.find('<Tooltip/>').exists()).toBeFalsey();
    //   driver = createDriver(<AddItem/>);
    //   const TooltipDriver = driver.getTooltipDriver();
    //   expect(TooltipDriver.exists()).toBeFalsey();
    // });

  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<AddItem/>, addItemTestkitFactory)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<AddItem/>, enzymeAddItemTestkitFactory, mount)).toBeTruthy();
    });
  });

});
