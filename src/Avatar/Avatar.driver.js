import {StylableDOMUtil} from 'stylable/test-utils';
import {findByHook} from '../../test/utils';
import style from './Avatar.st.css';

const avatarDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    exists: () => !!element,
    getTagName: () => element.tagName.toLowerCase(),
    getText: () => element.innerHTML,
    getSize: () => stylableDOMUtil.getStyleState(element, 'size'),
    getColor: () => stylableDOMUtil.getStyleState(element, 'color'),
    getState: () => stylableDOMUtil.getStyleState(element, 'state'),
    getCustomColor: () => element.style.background || element.style,
    getImageUrl: () => element.style.backgroundImage,
    isPlaceholder: () => !!findByHook(element, 'placeholder')
  };
};

export default avatarDriverFactory;
