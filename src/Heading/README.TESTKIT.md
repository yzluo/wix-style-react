# Heading component

## Heading TestKit API

### Puppeteer
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| element | - | element | returns the element |
| getValue | - | string | get value of the element |


## Usage Example

> Unit testing example

```javascript
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
