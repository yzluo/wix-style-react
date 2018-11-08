import React from 'react';
import { func, any, array } from 'prop-types';
import Wix from 'Wix';
import WixStyleProvider from './WixStyleProvider';

export default class WixStyleTpaProvider extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      theme: props.themeCreator(),
      events: props.events.filter(event => Wix.Events[event] !== undefined),
    };
  }

  update(data) {
    this.setState({ theme: this.props.themeCreator(data) });
  }

  componentDidMount() {
    this.state.events.forEach(event =>
      Wix.addEventListener(Wix.Events[event], this.update),
    );
  }

  componentWillUnmout() {
    this.state.events.forEach(event =>
      Wix.removeEventListener(Wix.Events[event], this.update),
    );
  }

  render() {
    return (
      <WixStyleProvider theme={this.state.theme}>
        {this.props.children}
      </WixStyleProvider>
    );
  }
}

WixStyleTpaProvider.propTypes = {
  themeCreator: func,
  children: any,
  events: array,
};

WixStyleTpaProvider.defaultProps = {
  events: ['STYLE_PARAMS_CHANGE'],
};
