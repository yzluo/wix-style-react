import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import React from 'react';
import styles from './Carousel.scss';
import PropTypes from 'prop-types';

class Pagination extends WixComponent {
  _isPageActive(index) {
    return index === this.props.currentPage;
  }

  render() {
    return (
      <div className={styles.pagination}>
        {this.props.totalPages &&
          Array.from({ length: this.props.totalPages }, (_, currentIndex) => {
            return (
              <div
                key={currentIndex}
                className={classNames(styles.dot, {
                  [styles.active]: this._isPageActive(currentIndex),
                })}
              />
            );
          })}
      </div>
    );
  }
}

//update images on imageUpdate
Pagination.propTypes = {
  /** The amount of pages to show */
  totalPages: PropTypes.number.isRequired,
  /** The active page index (zero based) */
  currentPage: PropTypes.number.isRequired,
};

Pagination.displayName = 'Pagination';

export default Pagination;
