import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './Heading.st.css';
import {baseUniDriverFactory} from 'wix-ui-test-utils/base-driver';

const headingDriverFactory = base => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  return {
    ...baseUniDriverFactory(base),
    getText: () => base.text(),
    getAppearance: async () => stylableDOMUtil.getStyleState(await base.getNative(), 'appearance'),
    isLight: async () => stylableDOMUtil.hasStyleState(await base.getNative(), 'light'),
    element: () => base.getNative()
  };
};

export default headingDriverFactory;
