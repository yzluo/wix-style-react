import React from 'react';
import PropTypes from 'prop-types';
import {Row} from './Row';
import Button from '../Backoffice/Button';
import styles from './FooterLayout.scss';


const FooterLayout = props => {
  const rightAlignedItems = (<div>
    {props.showCancelButton &&
    <Button
      dataHook="cancel-button"
      disabled={!props.isCancelButtonEnabled}
      onClick={props.onCancelButtonClick}
      children={props.cancelButtonContent}
      theme="whiteblue"
      />
    }

    {props.showConfirmButton &&
    <Button
      dataHook="confirm-button"
      disabled={!props.isConfirmButtonEnabled}
      onClick={props.onConfirmButtonClick}
      children={props.confirmButtonContent}
      />
    }
  </div>);
  return (
    <div className={styles.footerLayout}>
      <Row
        rightAlignedItems={rightAlignedItems}
        leftAlignedItems={props.sideActions}
        />
    </div>
  );
}
;


FooterLayout.propTypes = {
  confirmButtonContent: PropTypes.node,
  cancelButtonContent: PropTypes.node,
  onConfirmButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  isConfirmButtonEnabled: PropTypes.bool,
  isCancelButtonEnabled: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  sideActions: PropTypes.node
};

FooterLayout.defaultProps = {
  showConfirmButton: true,
  showCancelButton: true,
  isConfirmButtonEnabled: true,
  isCancelButtonEnabled: true,
  confirmButtonContent: 'Save',
  cancelButtonContent: 'Cancel'
}
;


export default FooterLayout;
