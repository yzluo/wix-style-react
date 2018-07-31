# Testing

> For component library to be stable, it must be testable and tested

We use [jest](https://facebook.github.io/jest/) for unit and [protractor](http://www.protractortest.org/#/) for end-to-end tests.

## Unit Tests

`npm run test:unit`

During `npm start`, unit tests will run automatically on each file change.
Make use of `jest`'s interactive mode, for example, press `p` in your command line and type the name of the test:

<img src="https://raw.githubusercontent.com/wix/wix-style-react/master/docs/assets/jest-interactive.png" alt="Interactive Jest Preview" width="600">

## End To End (E2E) Tests

Run all once:

* `npm run test:e2e`

Run "on demand":
* `npm run storybook` - serve storybook in E2E mode
* `npm run test:e2e-only` - run just e2e tests in separate terminal instance

We use [`eyes.it`](https://github.com/wix/eyes.it):

```js
import eyes from 'eyes.it';

eyes.it('should test something with screenshot diff', () => {
  expect(assert).toEqual(expectation);
});
```

Simply use `eyes.it` instead of `it` or `eyes.fit` to focus one test.

Use `browser.sleep(999)` for quick debugging.
Relevant details defined in [protractor docs](http://www.protractortest.org/#/api?view=ProtractorBrowser).

# TestKits

> For component library to be testable, it must provide testkits.

`wix-style-react` comes with components testkits.  Each component has a `<componentName>TestkitFactory` method which exposes api relevant to component.

It will receive a wrapper (for now we only support Enzyme wrapper) and component `dataHook` as an input, and returns an object which contains all API methods.

## Example

Using wix style Button in your production code:

```js
<myForm>
  ...
  <Button dataHook="my-button" />
  ...
</myForm>
```

Inside your test:

```js
import ReactTestUtils from 'react-dom/test-utils';
import {buttonTestkitFactory} from 'wix-style-react/testkit';

const myFormWrapper = ReactTestUtils.renderIntoDocument(<myForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive a DOM element wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```

If you are using Enzyme:

```js
import {mount} from 'enzyme';
import {buttonTestkitFactory} from 'wix-style-react/testkit/enzyme';

const myFormWrapper = mount(<myForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive an Enzyme wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```


If you are using Protractor:

```js
import {buttonTestkitFactory, waitForVisibilityOf} from 'wix-style-react/testkit/protractor';

const dataHook = 'my-button';

//Pass the data hook and expose the driver API
const driver = buttonTestkitFactory({dataHook});

//Go to your app URL which has the component in it
browser.get(appUrl);

//waitForVisibilityOf(..) waits untill the element/elements appears, and starts the tests.
//Otherwise it will timeout and print the 2nd arg as error message.
//This function accepts an element or an array of elements
waitForVisibilityOf(driver.element(), 'Cant find Button')
  .then(() => {

    //Do actual tests here
    expect(driver.getButtonText()).toBe('Click Me!');
    driver.click();
    expect(driver.getButtonText()).toBe('Clicked!');
  });
```
