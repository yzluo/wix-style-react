import React, {Component} from 'react';
import Button from 'wix-style-react/Button';
import Modal from 'wix-style-react/Modal';

import {ComposerLayout} from '../../../src/ComposerLayout';
import {GenericModalLayout} from '../../../src/GenericModalLayout';


class GenericModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpenGenericModal: false
    };
  }

  renderComposerLayout() {
    const confirmButtonContent = 'Save!';
    const cancelButtonContent = 'Cancel!';
    const content = 'hello world! '.repeat(100);

    return (<ComposerLayout
      content={<div style={{wordBreak: 'all'}}>{content}</div>}
      title="title"
      headerSideActions={<div>Some header Side Actions</div>}
      footerSideActions={<div>Some footer Side Actions</div>}
      confirmButtonContent={confirmButtonContent}
      cancelButtonContent={cancelButtonContent}
      fullscreen
      />);
  }

  renderGenericLayout() {
    const x = new Array(100).fill(<div>hello</div>);
    return (<GenericModalLayout
      header="header"
      content={x}
      footer="footer"
      />);
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeGenericModal = setState({isOpenGenericModal: false});
    const openGenericModal = setState({isOpenGenericModal: true});

    return (
      <div>
        <Button
          dataHook="open-fullscreen-generic-modal-button"
          onClick={openGenericModal}
          >Open Generic Modal</Button>

        <Modal
          contentLabel="Generic modal example"
          isOpen={this.state.isOpenGenericModal}
          onRequestClose={closeGenericModal}
          >
          {this.renderComposerLayout()}
        </Modal>
      </div>
    );
  }
}

export default () => <GenericModal/>;
