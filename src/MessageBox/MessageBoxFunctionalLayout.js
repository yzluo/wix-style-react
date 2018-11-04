import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import styles from './MessageBoxFunctionalLayout.scss';

class MessageBoxFunctionalLayout extends WixComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasScroll: false,
      scrolledToBottom: false
    };

    this.messageBoxRef = null;
    this.MessageBoxContainerRef = null;
  }

  componentWillUnmount() {
    if (this.state.hasScroll) {
      this.messageBoxRef.removeEventListener('scroll', this._handleMessageBoxScroll);
    }
  }

  _initializeMessageBoxRef = el => {
    if (el && el.scrollHeight > el.clientHeight) {
      this.setState({hasScroll: true});

      this.messageBoxRef = el;
      this.messageBoxRef.addEventListener('scroll', this._handleMessageBoxScroll);
    }
  };

  _initializeMessageBoxContainerRef= el => this.MessageBoxContainerRef = el;

  componentDidMount() {
    const headerLayoutHeight = this.MessageBoxContainerRef.children[0].clientHeight;
    const messageBodyHeight = this.MessageBoxContainerRef.children[1].clientHeight;
    const footerLayoutHeight = this.MessageBoxContainerRef.children[2].clientHeight;

    const totalClientHeight = headerLayoutHeight + messageBodyHeight + footerLayoutHeight;

    if (totalClientHeight > window.innerHeight) {
      const maxHeight = window.innerHeight - (48 * 2) - headerLayoutHeight - footerLayoutHeight;
      this.setState({maxHeight});
    }
  }

  _handleMessageBoxScroll = throttle(() => {
    const scrolledToBottom =
      this.messageBoxRef.scrollTop + this.messageBoxRef.clientHeight === this.messageBoxRef.scrollHeight;

    if (scrolledToBottom !== this.state.scrolledToBottom) {
      this.setState({scrolledToBottom});
    }
  }, 16);

  render() {
    const {
      title,
      onCancel,
      onOk,
      onClose,
      confirmText,
      cancelText,
      children,
      buttonsHeight,
      hideFooter,
      footerBottomChildren,
      theme,
      closeButton,
      disableConfirmation,
      disableCancel,
      width,
      noBodyPadding,
      maxHeight,
      fullscreen,
      withEmptyState,
      sideActions,
      image
    } = this.props;
    const {hasScroll, scrolledToBottom, maxHeight: maxHeightState} = this.state;

    const messageBoxBodyClassNames = classNames(
      styles.body,
      {
        [styles.scrollable]: typeof maxHeight !== 'undefined' || typeof maxHeightState !== 'undefined',
        [styles.noPadding]: noBodyPadding,
        [styles.fullscreenBody]: fullscreen,
        [styles.noFooter]: hideFooter,
        [styles.footerBorder]: hasScroll && !scrolledToBottom,
        [styles.withEmptyState]: withEmptyState
      }
    );

    const messageBoxBodyStyle = {
      maxHeight: maxHeight || maxHeightState
    };

    const contentClassName = classNames(
      styles.content,
      {
        [styles.fullscreenContent]: fullscreen
      }
    );

    const imageClassName = classNames(
      styles.image,
      {
        [styles.withFooterAction]: sideActions,
        [styles.noPadding]: noBodyPadding
      }
    );

    return (
      <div className={contentClassName} style={{width}} ref={this._initializeMessageBoxContainerRef}>
        <HeaderLayout
          title={title}
          onCancel={onClose ? onClose : onCancel}
          theme={theme}
          closeButton={closeButton}
          />
        {image && !withEmptyState ?
          <div className={styles.messageWithImage}>
            <div className={imageClassName} children={image}/>
            <div
              data-hook="message-box-body"
              className={messageBoxBodyClassNames}
              style={messageBoxBodyStyle}
              ref={this._initializeMessageBoxRef}
              >
              {children}
            </div>
          </div> :
          <div
            data-hook="message-box-body"
            className={messageBoxBodyClassNames}
            style={messageBoxBodyStyle}
            ref={this._initializeMessageBoxRef}
            >
            {children}
          </div>
        }
        {!hideFooter ? (
          <FooterLayout
            bottomChildren={footerBottomChildren}
            enableCancel={!disableCancel}
            enableOk={!disableConfirmation}
            buttonsHeight={buttonsHeight}
            confirmText={confirmText}
            cancelText={cancelText}
            onCancel={onCancel}
            onOk={onOk}
            theme={theme}
            sideActions={sideActions}
            />
        ) : null}
      </div>
    );
  }
}

MessageBoxFunctionalLayout.propTypes = {
  hideFooter: PropTypes.bool,
  confirmText: PropTypes.node,
  cancelText: PropTypes.node,
  theme: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.any,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonsHeight: PropTypes.string,
  closeButton: PropTypes.bool,
  disableCancel: PropTypes.bool,
  disableConfirmation: PropTypes.bool,
  noBodyPadding: PropTypes.bool,
  footerBottomChildren: PropTypes.node,
  fullscreen: PropTypes.bool,
  withEmptyState: PropTypes.bool,
  sideActions: PropTypes.node,
  image: PropTypes.node
};

MessageBoxFunctionalLayout.defaultProps = {
  buttonsHeight: 'small',
  disableCancel: false,
  disableConfirmation: false,
  noBodyPadding: false,
  fullscreen: false,
  withEmptyState: false
};

export default MessageBoxFunctionalLayout;
