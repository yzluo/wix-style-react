import * as React from 'react';
import {createDriverFactory} from '../test-common';
import {ExampleTSComp} from './ExampleTSComp';
import {exampleTsCompDriverFactory} from './ExampleTSComp.driver';

describe('sanity', () => {
  const createDriver = createDriverFactory(exampleTsCompDriverFactory);
  it('should render', () => {
    const driver = createDriver(<ExampleTSComp name="erez"/>);
    expect(driver.exists()).toBeTruthy();
  });
});