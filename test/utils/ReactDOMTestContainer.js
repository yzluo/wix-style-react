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
  // Disable eslint rule react/no-render-return-value for ReactDOM.render()
  // Future version of react may use this method asynchronously and also
  // it will be depracated in React 17.
  renderAsync(jsx) {
    return new Promise(resolve => ReactDOM.render(jsx, this.node, resolve)); //eslint-disable-line react/no-render-return-value
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
      await this.renderAsync(jsx);
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
      await this.renderAsync(jsx);
      const base = reactUniDriver(this.componentNode);
      return driverFactory(base);
    };
  }
}
