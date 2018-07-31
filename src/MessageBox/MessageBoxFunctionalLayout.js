import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

import styles from './MessageBoxFunctionalLayout.scss';

class MessageBoxFunctionalLayout extends WixComponent {

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
      fullscreen
    } = this.props;


    const messageBoxBodyClassNames = classNames(
      styles.body,
      {
        [styles.scrollable]: typeof maxHeight !== 'undefined',
        [styles.noPadding]: noBodyPadding,
        [styles.fullscreenBody]: fullscreen
      }
    );
    const messageBoxBodyStyle = {
      maxHeight
    };

    const contentClassName = classNames(
      styles.content,
      {
        [styles.fullscreenContent]: fullscreen
      }
    );

    return (
      <div className={contentClassName} style={{width}}>
        <HeaderLayout title={title} onCancel={onClose ? onClose : onCancel} theme={theme} closeButton={closeButton}/>
        <div
          data-hook="message-box-body"
          className={messageBoxBodyClassNames}
          style={messageBoxBodyStyle}
          >
          {children}
        </div>
        {
          !hideFooter ? <FooterLayout
            bottomChildren={footerBottomChildren}
            enableCancel={!disableCancel}
            enableOk={!disableConfirmation}
            buttonsHeight={buttonsHeight}
            confirmText={confirmText}
            cancelText={cancelText}
            onCancel={onCancel}
            onOk={onOk}
            theme={theme}
            /> : null
        }
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
  fullscreen: PropTypes.bool
};

MessageBoxFunctionalLayout.defaultProps = {
  buttonsHeight: 'small',
  disableCancel: false,
  disableConfirmation: false,
  noBodyPadding: false,
  fullscreen: false
};

export default MessageBoxFunctionalLayout;
