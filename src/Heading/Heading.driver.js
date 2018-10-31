import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './Heading.st.css';
import {baseUniDriverFactory} from 'wix-ui-test-utils/base-driver';

const headingDriverFactory = base => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  return {
    ...baseUniDriverFactory(base),
    getText: async () => await base.getNative().innerHTML,
    getAppearance: async () => await stylableDOMUtil.getStyleState(await base.getNative(), 'appearance'),
    isLight: async () => {
      const element = await base.getNative();
      return stylableDOMUtil.hasStyleState(element, 'light');
    },
    element: async () => await base.getNative()
  };
};

export default headingDriverFactory;
