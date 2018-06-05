import React from 'react';
import {createDriverFactory, resolveIn} from '../test-common';
import {addItemTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {addItemTestkitFactory as enzymeAddItemTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import AddItem from './AddItem';
import addItemDriverFactory from './AddItem.driver';

describe('AddItem', () => {

  const TOOLTIP_CONTENT = 'BLA BLA';
  const createDriver = createDriverFactory(addItemDriverFactory);
  let props, driver;
  const addItem = jest.fn();


  beforeEach(() => {
    document.body.innerHTML = '';
    props = {
      tooltipContent: TOOLTIP_CONTENT
    };
  });

  describe('when default scenario', () => {
    beforeEach(() => {
      props = {
        onAddItem: addItem,
        tooltipContent: TOOLTIP_CONTENT
      };
      driver = createDriver(<AddItem {...props}/>);
    });

    it('should trigger add item', () => {
      props = {
        onAddItem: addItem,
        tooltipContent: TOOLTIP_CONTENT
      };
      driver = createDriver(<AddItem {...props}/>);
      driver.clickAdd();
      expect(addItem).toBeCalled();
    });

  });

  describe('height and width', () => {

    it('should be added to style attribute when item is not present', () => {
      props = {
        tooltipContent: TOOLTIP_CONTENT,
        width: 300,
        height: 300
      };
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getContainerStyles()).toEqual('width: 300px; height: 300px;');
    });

    it('should not add style attribute when width and height props are not passed', () => {
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getContainerStyles()).toEqual(null);
    });

  });

  describe('hide or show add item', () => {

    it('should have an Add item tooltip', () => {
      driver = createDriver(<AddItem {...props}/>);
      const wrapper = driver.getElement();
      const TooltipDriver = tooltipTestkitFactory({wrapper, dataHook: 'add-tooltip'});
      TooltipDriver.mouseEnter();
      return resolveIn(50)
        .then(() => {
          expect(TooltipDriver.isShown()).toBeTruthy();
          expect(TooltipDriver.getContent()).toEqual(props.tooltipContent);
        });
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><AddItem {...props} dataHook={dataHook}/></div>));
      const addItemTestkit = addItemTestkitFactory({wrapper, dataHook});
      expect(addItemTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<AddItem {...props} dataHook={dataHook}/>);
      const addItemTestkit = enzymeAddItemTestkitFactory({wrapper, dataHook});
      expect(addItemTestkit.exists()).toBeTruthy();
    });
  });

});
