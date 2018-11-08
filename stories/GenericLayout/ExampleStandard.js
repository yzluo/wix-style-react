import React from 'react';
import Button from 'wix-style-react/Button';
import GenericLayout from 'wix-style-react/GenericLayout';
import Modal from 'wix-style-react/Modal';

import styles from './ExampleStandard.scss';


export default class ExampleStandard extends React.Component {
  constructor() {
    super();

    this.state = {
      isModalOpened: false
    };
  }

  openModal() {
    this.setState({
      isModalOpened: true
    });
  }

  closeModal() {
    this.setState({
      isModalOpened: false
    });
  }

  render() {
    return (
      <div>
        <Button
          dataHook="open-default-generic-layout-in-modal-button"
          onClick={() => this.openModal()}
          >Open Layout in Modal</Button>

        <Modal
          isOpen={this.state.isModalOpened}
          onRequestClose={() => this.closeModal()}
          contentLabel="Generic layout"
          shouldDisplayCloseButton
          >
          <GenericLayout
            header={<div className={styles.header}>header</div>}
            content={<div className={styles.content}>content</div>}
            footer={<div className={styles.footer}>footer</div>}
            dataHook="default-generic-layout"
            />
        </Modal>
      </div>
    );
  }
}
