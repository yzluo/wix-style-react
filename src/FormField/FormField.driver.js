import {resolveIn} from '../test-common';
import {tooltipTestkitFactory} from '../../testkit';

const findByHook = (element, hook) =>
  element.querySelector(`[data-hook*="${hook}"]`);

const getInfoIcon = element =>
  findByHook(element, 'formfield-infoicon');

const getCharactersCounter = element =>
  findByHook(element, 'formfield-counter');

const formFieldDriver = ({element}) => ({
  exists: () => !!element,
  element: () => element,
  getChildren: () => findByHook(element, 'formfield-children'),
  getLabel: () => findByHook(element, 'formfield-label'),
  isRequired: () => !!findByHook(element, 'formfield-asterisk'),
  getLengthLeft: () => {
    const counter = getCharactersCounter(element);
    return counter ? parseInt(counter.innerHTML, 10) : null;
  },
  isLengthExceeded: () => {
    const counter = getCharactersCounter(element);
    if (counter) {
      const length = parseInt(counter.innerHTML, 10);
      return length < 0;
    }
    return false;
  },
  getInfoContent: () => {
    const tooltipDriver = tooltipTestkitFactory({
      wrapper: getInfoIcon(element),
      dataHook: 'formfield-infotooltip'
    });

    tooltipDriver.mouseEnter();
    return resolveIn(500)
      .then(() => tooltipDriver.getContent());
  }
});

export default formFieldDriver;
