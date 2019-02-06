import { accordionDriverFactory as publicDriverFactory } from './Accordion.driver';

export const accordionPrivateDriverFactory = base => ({
  ...publicDriverFactory(base),
  getAmmountOfItems: async () =>
    base.$$('[data-hook="accordion-item"]').count(),
});
