# Text Testkits

> Text

## Text TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| exists   | -         | boolean        | check if element exists          |
| hasEllipsis | -         | boolean         | check if component has ellipsis |
| hasTitleAttribute | -         | boolean         | check if element has title attribute |
| getTitle | -         | string         | returns the element title attribute |
| getTagName | -         | string         | get the rendered tag name |
| getText | -         | string         | get the rendered content |
| getSize | -         | string         | returns the size of the text |
| getSkin | -         | string         | returns the skin of the text |
| isLight | -         | boolean         | check if the text is light |
| isBold | -         | boolean         | check if the text is bold |
| isSecondary | -         | boolean         | check if the text is secondary |


## Text Protractor TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| element  | -         | element        | returns the driver element               |
| getText  | -         | string        | returns the component text               |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {mount} from 'enzyme';
  import {textTestkitFactory} from 'wix-style-react/dist/testkit';
  import {textTestkitFactory as enzymeTextTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  import Text from 'wix-style-react/Text';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Text dataHook={dataHook}/></div>);
  const testkit = enzymeTextTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Text dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = textTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <Text dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {textTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = textTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Text')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });

```
