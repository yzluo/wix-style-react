# Page Testkits

> Page

## Page TestKit API

| method                   | arguments | returned value | description                              |
| ------------------------ | --------- | -------------- | ---------------------------------------- |
| exists                   | -         | boolean        | fulfilled if element in the DOM          |
| backgroundImageExists    | -         | boolean        | true if header background image exist    |
| gradientClassNameExists  | -         | boolean        | true if gradient class name exist        |
| tailExists               | -         | boolean        | true if title exist in DOM               |
| gradientContainerHeight  | -         | string         | return container height                  |
| getPageHtml              | -         | string         | returns html in a string form            |

## Page Protractor TestKit API

| method       | arguments | returned value | description                              |
| ------------ | --------- | -------------- | ---------------------------------------- |
| element      | -         | element        | returns the driver element               |
| scrollDown   | -         | boolean        | scrolls down to minimized page           |
| scrollUp     | -         | string         | scrolls up to maximised page             |
| titleExists  | -         | boolean        | true if title exists                     |
| titleElement | -         | element        | returns title element                    |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {mount} from 'enzyme';
  import {pageTestkitFactory} from 'wix-style-react/dist/testkit';
  import {enzymePageTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  import Page from 'wix-style-react/Page';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';

  const page = (
    <Page dataHook={dataHook} >
        <Page.Header title="title"/>
        <Page.Content>
          <div>content</div>
      </Page.Content>
    </Page>
  );
  
 const wrapper = mount(page)
 const testkit = enzymePageTestkitFactory({wrapper, dataHook});

 //Do tests
 expect(testkit.exists()).toBeTruthy();
```

> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <Page dataHook={dataHook} >
    <Page.Header title="title"/>
    <Page.Content>
      <div>content</div>
    </Page.Content>
  </Page>

  /*******************
   protractor example
  *******************/

  import {pageTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = pageTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Page')
  .then(() => {
      //Do tests
      expect(testkit.titleExists()).toBeTruthy();
  });

```
