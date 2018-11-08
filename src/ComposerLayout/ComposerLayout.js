import React from 'react';
import PropTypes from 'prop-types';
import GenericLayout from '../GenericLayout';
import {HeaderLayout} from './HeaderLayout';
import FooterLayout from './FooterLayout';
import styles from './ComposerLayout.scss';

export const ComposerLayout = props => {

  const header = (<div data-hook="header">
    <HeaderLayout
      title={props.title}
      showCloseButton={props.showCloseButton}
      showInfoButton={props.showInfoButton}
      onCloseButtonClick={props.onCloseButtonClick}
      onInfoButtonClick={props.onInfoButtonClick}
      sideActions={props.headerSideActions}
      />
  </div>);

  const footer = (<div data-hook="footer">
    <FooterLayout
      confirmButtonContent={props.confirmButtonContent}
      cancelButtonContent={props.cancelButtonContent}
      showConfirmButton={props.showConfirmButton}
      showCancelButton={props.showCancelButton}
      isConfirmButtonEnabled={props.isConfirmButtonEnabled}
      isCancelButtonEnabled={props.isCancelButtonEnabled}
      onConfirmButtonClick={props.onConfirmButtonClick}
      onCancelButtonClick={props.onCancelButtonClick}
      sideActions={props.footerSideActions}
      />
  </div>);

  const content = <div data-hook="content" className={styles.content}>{props.content}</div>;

  return (
    <GenericLayout
      data-hook="generic-layout"
      header={props.showHeader && header}
      content={content}
      footer={props.showFooter && footer}
      fullscreen={props.fullscreen}
      />
  );
};

ComposerLayout.propTypes = {
  content: PropTypes.node,
  title: PropTypes.node,
  showCloseButton: PropTypes.bool,
  showInfoButton: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onInfoButtonClick: PropTypes.func,
  headerSideActions: PropTypes.node,
  fullscreen: PropTypes.bool,
  confirmButtonContent: PropTypes.node,
  cancelButtonContent: PropTypes.node,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  isConfirmButtonEnabled: PropTypes.bool,
  isCancelButtonEnabled: PropTypes.bool,
  onConfirmButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  footerSideActions: PropTypes.node,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool
};

ComposerLayout.defaultProps = {
  fullscreen: false,
  showHeader: true,
  showFooter: true
};
