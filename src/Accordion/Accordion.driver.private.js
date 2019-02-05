import { accordionDriverFactory as publicDriverFactory } from './Accordion.driver';

export const accordionPrivateDriverFactory = base => ({
  ...publicDriverFactory(base),
  getAmmountOfDisplayedRows: async () => base.$$('[data-hook="accordion-row"]').count()
});
