import React from 'react';
import {createUniDriverFactory} from 'wix-ui-test-utils/uni-driver-factory';
import InfoCircle from "../../new-icons/InfoCircle";

import Accordion from './Accordion';
import {accordionPrivateDriverFactory} from './Accordion.driver.private';

describe('Accordion', () => {
  const createDriver = createUniDriverFactory(accordionPrivateDriverFactory);
  const towItemsData = [
    {
      title: 'hello',
      icon: (<InfoCircle/>),
      content: 'test'
    },
    {
      title: 'hello1',
      icon: (<InfoCircle/>),
      content: 'test1'
    }
  ];
  it('should render a list of row items', async () => {
    const data = [
      {
        title: 'hello'
      }
    ];
    const driver = createDriver(<Accordion data={data}/>);
    expect(await driver.getTitleOfRowAt(0)).toEqual('hello');
  });

  it('should not render any rows', async () => {
    const driver = createDriver(<Accordion/>);

    expect(await driver.getAmmountOfDisplayedRows()).toEqual(0);
  });

  it('should render rows with icons', async () => {
    const data = [
      {
        title: 'hello',
        icon: (<InfoCircle/>),
        content: 'test'
      },
      {
        title: 'hello',
        content: 'test'
      }
    ];
    const driver = createDriver(<Accordion data={data}/>);
    expect(await driver.isIconExistsAt(0)).toBeTruthy();
    expect(await driver.isIconExistsAt(1)).toBeFalsy();
  });

  it('should specific row content on click', async () => {

    const driver = createDriver(<Accordion data={towItemsData}/>);
    expect(await driver.isRowExpandedAt(0)).toBeFalsy();
    expect(await driver.isRowExpandedAt(1)).toBeFalsy();

    await driver.clickAtRow(0);
    expect(await driver.isRowExpandedAt(0)).toBeTruthy();
    expect(await driver.isRowExpandedAt(1)).toBeFalsy();
  })

  it('should verify the expand and collapse labels', async () => {
    const driver = createDriver(<Accordion data={towItemsData}/>);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual('More');
    await driver.clickAtRow(0);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual('Less');
  });

  it('should collapse an expended row on click', async () => {
    const driver = createDriver(<Accordion data={towItemsData}/>);

    expect(await driver.isRowOpenAt(0)).toBeFalsy();

    await driver.clickAtRow(0);
    expect(await driver.isRowOpenAt(0)).toBeTruthy();
  })

  it('should expend a row on click and close an already expanded row', async () => {
    const driver = createDriver(<Accordion data={towItemsData}/>);

    await driver.clickAtRow(0);
    await driver.clickAtRow(1);
    expect(await driver.isRowOpenAt(1)).toBeTruthy();
    expect(await driver.isRowOpenAt(0)).toBeFalsy();

    await driver.clickAtRow(1);
    expect(await driver.isRowOpenAt(1)).toBeFalsy();
    expect(await driver.isRowOpenAt(0)).toBeFalsy();
  });
});
