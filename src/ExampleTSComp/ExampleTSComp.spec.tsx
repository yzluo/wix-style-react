import * as React from 'react';
import {createDriverFactory} from '../test-common';
import {ExampleTSComp} from './ExampleTSComp';
import {exampleTsCompDriverFactory, ExampleTSCompDriver} from './ExampleTSComp.driver';

describe('sanity', () => {
  const createDriver = createDriverFactory(exampleTsCompDriverFactory);
  it('should render', () => {
    let driver: ExampleTSCompDriver;
    driver = createDriver(<ExampleTSComp name="erez"/>);
    expect(driver.exists()).toBeTruthy();
  });
});