import BreadcrumbsDriverFactory from './Breadcrumbs.driver';
import styles from './Breadcrumbs.scss';

export default driverInterface => ({
  ...BreadcrumbsDriverFactory(driverInterface),

  isItemFullWidthAt: position =>
    driverInterface.element
      .querySelectorAll(`.${styles.item}`)
      [position].classList.contains(styles.itemFullWidth),
});
