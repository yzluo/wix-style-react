import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';

const MOUSE_EVENTS_SUPPORTED = ['mouseup', 'touchend'];

export interface WixComponentProps {
  styles?: any;
  dataHook?: string
}

class WixComponent<P extends WixComponentProps = WixComponentProps, S = {}> extends React.PureComponent<P,S> {
  private styles: any;
  private typography: any;
  private _boundEvents: string[];

  static propTypes = {
    dataHook: PropTypes.string,
    styles: PropTypes.string
  };
  
  constructor(params) {
    super(params);
    this._addDataHook = this._addDataHook.bind(this);
    this._supportOnClickOutside = this._supportOnClickOutside.bind(this);
    this._onMouseEventsHandler = this._onMouseEventsHandler.bind(this);
  }

  checkIfEventOnElements(e, elem) {
    let current = e.target;
    while (current.parentNode) {
      if (elem.indexOf(current) > -1) {
        return true;
      }
      current = current.parentNode;
    }

    return current !== document;
  }

  componentElements() {
    return [ReactDOM.findDOMNode(this)];
  }

  setStyles(styles, typography = {}) {
    if (this.props.styles) {
      this.styles = this.props.styles;
    } else {
      this.styles = styles;
    }
    this.typography = this.props.styles || typography;
  }

  onClickOutside(event: MouseEvent) {};

  
  _onMouseEventsHandler(e) {
    if (!this.checkIfEventOnElements(e, this.componentElements())) {
      this.onClickOutside(e);
    }
  }

  _addDataHook(dataHook) {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      domNode.setAttribute('data-hook', dataHook);
    }
  }

  _supportOnClickOutside() {
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  }

  componentDidMount() {
    const {dataHook} = this.props;
    if (dataHook) {
      this._addDataHook(dataHook);
    }

    if (typeof this.onClickOutside === 'function') {
      this._supportOnClickOutside();
    }
  }

  componentWillUnmount() {
    if (this._boundEvents && typeof document !== 'undefined') {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(eventName, this._onMouseEventsHandler, true);
      });
    }
  }
}

export default WixComponent;
