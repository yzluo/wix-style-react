import React from 'react';
import styles from './component.scss';
import Button from '../../Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';

export default ({expend, open, onClickHandler, moreLabel = 'More', lessLabel = 'Less'}) => (
  <div
    data-hook='toggle-accordion-wrapper'
    className={`${styles.toggleButtons} ${open ? styles.open : ''} ${expend ? styles.expend : ''}`}
    onClick={onClickHandler}>
    <ChevronDown className={styles.downArrow} size="18px"/>
    <Button
      dataHook="toggle-accordion-button"
      as="button"
      suffixIcon={open ? <ChevronUp/> : <ChevronDown/>}
      className={styles.button}
      priority={open ? "secondary" : 'primary'}
      size="small"
    >
      {open ? lessLabel : moreLabel}
    </Button>
  </div>
);
