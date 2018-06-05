import React from 'react';
import {createDriverFactory, resolveIn} from '../test-common';
import {addItemTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {addItemTestkitFactory as enzymeAddItemTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import AddItem from './AddItem';
import addItemDriverFactory from './AddItem.driver';

describe('AddItem', () => {

  const createDriver = createDriverFactory(addItemDriverFactory);
  let props, driver;
  const addImage = jest.fn();


  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('when default scenario', () => {
    beforeEach(() => {
      props = {
        onAddImage: addImage
      };
      driver = createDriver(<AddItem {...props}/>);
    });

    it('should trigger add image', () => {
      props = {
        onAddImage: addImage
      };
      driver = createDriver(<AddItem {...props}/>);
      driver.clickAdd();
      expect(addImage).toBeCalled();
    });

  });

  describe('height and width', () => {

    it('should be added to style attribute when image is not present', () => {
      props = {
        width: 300,
        height: 300
      };
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getContainerStyles()).toEqual('width: 300px; height: 300px;');
    });

    it('should not add style attribute when width and height props are not passed', () => {
      driver = createDriver(<AddItem/>);
      expect(driver.getContainerStyles()).toEqual(null);
    });
  });

  describe('hide or show add image', () => {

    it('should have an Add Image tooltip', () => {
      driver = createDriver(<AddItem/>);
      const wrapper = driver.getElement();
      const TooltipDriver = tooltipTestkitFactory({wrapper, dataHook: 'add-image-tooltip'});
      TooltipDriver.mouseEnter();
      return resolveIn(50)
        .then(() => {
          expect(TooltipDriver.isShown()).toBeTruthy();
          expect(TooltipDriver.getContent()).toEqual('Add Image');
        });
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><AddItem dataHook={dataHook}/></div>));
      const imageViewerTestkit = addItemTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<AddItem dataHook={dataHook}/>);
      const imageViewerTestkit = enzymeAddItemTestkitFactory({wrapper, dataHook});
      expect(imageViewerTestkit.exists()).toBeTruthy();
    });
  });

});
