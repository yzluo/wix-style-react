import {textDriverFactory as coreTextDriverFactory} from 'wix-ui-backoffice/dist/src/components/core/CoreText/Text.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Text.st.css';

const textDriverFactory = ({element, eventTrigger, wrapper}) => {
  const coreTextDriver = coreTextDriverFactory({element, eventTrigger, wrapper});
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    ...coreTextDriver,
    getSize: () => stylableDOMUtil.getStyleState(element, 'size'),
    getSkin: () => stylableDOMUtil.getStyleState(element, 'skin'),
    isLight: () => stylableDOMUtil.hasStyleState(element, 'light'),
    isBold: () => stylableDOMUtil.hasStyleState(element, 'bold'),
    isSecondary: () => stylableDOMUtil.hasStyleState(element, 'secondary')
  };
};

export default textDriverFactory;
