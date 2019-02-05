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
    expect(await driver.getTitleOfRow(0)).toEqual('hello');
  });

  it('should not render any rows', async () => {
    const driver = createDriver(<Accordion/>);

    expect(await driver.getRows()).toEqual(0);
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
    expect(await driver.getIconAt(0)).toBeTruthy();
    expect(await driver.getIconAt(1)).toBeFalsy();
  });

  it('should specific row content on click', async () => {

    const driver = createDriver(<Accordion data={towItemsData}/>);
    expect(await driver.isContentOpen(0)).toBeFalsy();
    expect(await driver.isContentOpen(1)).toBeFalsy();

    await driver.clickAtRow(0);
    expect(await driver.isContentOpen(0)).toBeTruthy();
    expect(await driver.isContentOpen(1)).toBeFalsy();
  })

  it('should check the default more less button labels', async () => {
    const driver = createDriver(<Accordion data={towItemsData}/>);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual('More');
    await driver.clickAtRow(0);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual('Less');
  });

  it('should override default more less button labels', async () => {
    const data = [
      {
        title: 'hello',
        icon: (<InfoCircle/>),
        content: 'test',
        moreLabel: 'hello',
        lessLabel: 'goodbye'
      },
      {
        title: 'hello',
        content: 'test',
        moreLabel: 'add',
        lessLabel: 'subtract'
      }
    ];
    const driver = createDriver(<Accordion data={data}/>);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual(data[0].moreLabel);
    await driver.clickAtRow(0);
    expect(await driver.getToggleButtonLabelAt(0)).toEqual(data[0].lessLabel);
  });

  it('should toggle the open between rows', async () => {
    const driver = createDriver(<Accordion data={towItemsData}/>);

    expect(await driver.isRowOpenAt(0)).toBeFalsy();
    expect(await driver.isRowOpenAt(1)).toBeFalsy();

    await driver.clickAtRow(0);
    expect(await driver.isRowOpenAt(0)).toBeTruthy();
    expect(await driver.isRowOpenAt(1)).toBeFalsy();

    await driver.clickAtRow(1);
    expect(await driver.isRowOpenAt(1)).toBeTruthy();
    expect(await driver.isRowOpenAt(0)).toBeFalsy();

    await driver.clickAtRow(1);
    expect(await driver.isRowOpenAt(1)).toBeFalsy();
    expect(await driver.isRowOpenAt(0)).toBeFalsy();

  });
});
