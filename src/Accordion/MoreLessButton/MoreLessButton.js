import React from 'react';
import styles from './MoreLessButton.scss';
import Button from '../../Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';
import classNames from 'classnames';

export default ({expend, isOpen, onClickHandler, expandLabel, collapseLabel}) => {
  const toggleStyle = classNames(styles.toggleButtons, {isOpen:styles.open, expend: styles.expend});
  return (
    <div
      data-hook='toggle-accordion-wrapper'
      className={toggleStyle}
      onClick={onClickHandler}>
      <ChevronDown className={styles.downArrow} size="18px"/>
      <Button
        dataHook="toggle-accordion-button"
        as="button"
        suffixIcon={isOpen ? <ChevronUp/> : <ChevronDown/>}
        className={styles.button}
        priority={isOpen ? "secondary" : 'primary'}
        size="small"
      >
        {isOpen ? collapseLabel : expandLabel}
      </Button>
    </div>
  );
}
