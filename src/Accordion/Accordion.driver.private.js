import { accordionDriverFactory as publicDriverFactory } from './Accordion.driver';

export const accordionPrivateDriverFactory = driverInterface => ({
  ...publicDriverFactory(driverInterface),
});
