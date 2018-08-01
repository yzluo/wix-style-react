# Heading Testkits

> Heading

## Heading TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| exists   | -         | boolean        | check if element exists          |
| getText | -         | string         | get the rendered content |
| isLight   | -         | boolean        | checks if the Heading is light      |

## Heading Protractor TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| element  | -         | element        | returns the driver element               |
| getText  | -         | string        | returns the component text               |

## Heading Puppeteer TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| element | - | element | returns the element |
| getValue | - | string | get value of the element |

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

  /*******************
   Puppeteer example
  *******************/

  import puppeteer from 'puppeteer';
  import headingTestkitFactory from 'wix-style-react/dist/testkit';

  //puppeteer setup
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //Create an element testkit via the data-hook attribute
  const heading = await headingTestkitFactory({
    dataHook: 'heading',
    page,
  });
  await page.goto(appUrl); //Your application url
  expect(await heading.getValue()).to.equal('WIX');
```
