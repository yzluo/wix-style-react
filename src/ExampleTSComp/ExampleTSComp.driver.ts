import * as React from 'react';
import {DriverFactory, BaseDriver} from 'wix-ui-test-utils/driver-factory';

export interface ExampleTSCompDriver extends BaseDriver{

}

export const exampleTsCompDriverFactory :DriverFactory<ExampleTSCompDriver>  =  ({wrapper, element, eventTrigger}): ExampleTSCompDriver => {
  return {
    exists: () => !!element,
  }
}