import {textDriverFactory as coreTextDriverFactory} from 'wix-ui-backoffice/dist/src/components/core/CoreText/Text.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Text.st.css';
import deprecationLog from '../utils/deprecationLog';

const textDriverFactory = ({element, eventTrigger, wrapper}) => {
  const coreTextDriver = coreTextDriverFactory({element, eventTrigger, wrapper});
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    ...coreTextDriver,
    getSize: () => stylableDOMUtil.getStyleState(element, 'size'),
    getSkin: () => stylableDOMUtil.getStyleState(element, 'skin'),
    getWeight: () => stylableDOMUtil.getStyleState(element, 'weight'),
    isLight: () => stylableDOMUtil.hasStyleState(element, 'light'),
    isSecondary: () => stylableDOMUtil.hasStyleState(element, 'secondary'),

    // Deprecated
    isBold: () => {
      deprecationLog('Text testkit method "isBold" is deprecated, use "getWeight" method instead');
      return stylableDOMUtil.hasStyleState(element, 'bold');
    }
  };
};

export default textDriverFactory;
