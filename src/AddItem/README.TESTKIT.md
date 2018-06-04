# ImageViewer Testkits

> ImageViewer

## ImageViewer TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getImageUrl | - | string | returns the image url |
| isImageVisible | - | boolean | returns true if image is visible |
| clickAdd | - | - | click the add button |
| clickUpdate | - | - | click the update button |
| clickRemove | - | - | click the remove button |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| click (Only in E2E) | - | - | click the element |
| element (Only in E2E) | - | element | returns the driver element |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {imageViewerTestkitFactory} from 'wix-style-react/dist/testkit';
  import {imageViewerTestkitFactory as enzymeImageViewerTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><ImageViewer dataHook={dataHook}/></div>);
  const testkit = enzymeImageViewerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><ImageViewer dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = imageViewerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <ImageViewer dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {imageViewerTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = imageViewerTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find ImageViewer')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
