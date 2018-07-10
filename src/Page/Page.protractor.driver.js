const titleElement = component => component.$(`[data-hook="page-header-title"]`);
const scrollableContentElement = component => component.$('[data-hook="page-scrollable-content"]');

const SCROLL_CONTENT_BIG_STEP = 200; // enough to minimize the Page
export const PRIVATE = Symbol('private driver');

const pageDriverFactory = component => {

  const setContentScrollOffset = async offset => {
    const element = scrollableContentElement(component);
    await browser.executeScript(`arguments[0].scrollTop = ${offset};`, await element.getWebElement());
  };

  return {
    element: () => component,
    /** Scroll content down, enough to minimize the Page. Receives scroll offset as argument, defaults to a step which is enough to minimize the Page. */
    scrollDown: () => setContentScrollOffset(SCROLL_CONTENT_BIG_STEP),
    titleExists: () => titleElement(component).isPresent(),
    titleElement: () => titleElement(component),
    [PRIVATE]: {
      setContentScrollOffset
    }
  };
};

export default pageDriverFactory;
