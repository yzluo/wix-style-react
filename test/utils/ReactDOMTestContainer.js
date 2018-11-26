import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-dom/test-utils';
import {reactUniDriver} from 'unidriver';

export function createDOMContainer() {
  const root = document.querySelector('#root') || document.body;
  const div = document.createElement('div');
  root.appendChild(div);
  return div;
}

// A wrapper around createDOMContainer to reduce boilerplate when working with
// React components.
export class ReactDOMTestContainer {
  node = null;

  get componentNode() {
    return this.node.firstElementChild;
  }

  // The container is usually created outside of before() test hook, and the
  // constructor runs before any of the tests, globally. Instead of attaching
  // the DOM element upfront in the constructor and polluting the document we
  // provide this method.
  create() {
    this.node = createDOMContainer();
    return this;
  }

  destroy() {
    this.node.remove();
    return this;
  }

  renderSync(jsx) {
    return new Promise(resolve => resolve(ReactDOM.render(jsx, this.node)));
  }

  renderWithRef(jsx) {
    const ref = React.createRef();
    jsx = React.cloneElement(jsx, {ref});
    return this.render(jsx).then(() => ref.current);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    return this;
  }

  unmountAfterEachTest() {
    beforeAll(() => this.create());
    afterEach(() => this.unmount());
    afterAll(() => this.destroy());
    return this;
  }

  destroyAfterEachTest() {
    beforeEach(() => this.create());
    afterEach(() => {
      this.unmount();
      this.destroy();
    });
    return this;
  }

  // Adapter for driver
  createRenderer(driverFactory) {
    return async jsx => {
      await this.renderSync(jsx);
      return driverFactory({
        element: this.componentNode,
        wrapper: this.node,
        eventTrigger: Simulate
      });
    };
  }

  // Adapter for uni driver
  createUniRenderer(driverFactory) {
    return async jsx => {
      await this.renderSync(jsx);
      const base = reactUniDriver(this.componentNode);
      return driverFactory(base);
    };
  }
}
