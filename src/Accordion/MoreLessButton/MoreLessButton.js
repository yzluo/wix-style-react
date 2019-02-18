import React from 'react';
import styles from './MoreLessButton.scss';
import Button from '../../Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';
import classNames from 'classnames';

export default ({
  dataHook,
  isOpen,
  handleClick,
  expandLabel,
  collapseLabel,
}) => {
  const toggleStyle = classNames(styles.toggleButtons, {
    [styles.open]: isOpen,
  });
  return (
    <div data-hook={dataHook} className={toggleStyle} onClick={e => {
      e.stopPropagation()
      handleClick()}
    }>
      <ChevronDown className={styles.expandCollapseArrow} size="18px" />
      <Button
        dataHook="toggle-accordion-button"
        suffixIcon={isOpen ? <ChevronUp /> : <ChevronDown />}
        className={styles.button}
        priority={isOpen ? 'secondary' : 'primary'}
        size="small"
      >
        {isOpen ? collapseLabel : expandLabel}
      </Button>
    </div>
  );
};
