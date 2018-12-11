import React from 'react';
import {
  arrayOf,
  func,
  oneOf,
  oneOfType,
  node,
  number,
  shape,
  string,
  any,
  bool,
} from 'prop-types';
import styles from './Breadcrumbs.scss';
import classnames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import Text from '../Text';
import BreadcrumbsPathFactory from './BreadcrumbsPathFactory';
import BreadcrumbsChevronRight from 'wix-ui-icons-common/system/BreadcrumbsChevronRight';

/**
 * a way to visualise current navigation path
 */
class Breadcrumbs extends WixComponent {
  static displayName = 'Breadcrumbs';

  static propTypes = {
    /**
     * * __id__ - Specifies the item id
     * * __link__ - Optional link to be called on click
     * * __value__ - Value to be shown on breadcrumb
     * * __disabled__ - if this value is disabled
     * * __customElement__ - A custom item which will be rendered
     */
    items: arrayOf(
      shape({
        id: oneOfType([string, number]).isRequired,
        value: node.isRequired,
        link: string,
        customElement: any,
        disabled: bool,
      }),
    ).isRequired,
    onClick: func,
    activeId: oneOfType([string, number]),
    size: oneOf(['medium', 'large']),
    theme: oneOf(['onWhiteBackground', 'onGrayBackground', 'onDarkBackground']),
  };

  static defaultProps = {
    size: 'medium',
    theme: 'onGrayBackground',
    onClick: () => {},
  };

  getTextAppearance(isActive) {
    const { theme, size } = this.props;

    const isDarkBackground = theme === 'onDarkBackground';
    const isSmallSize = size === 'medium';

    return {
      weight: isActive ? 'normal' : 'thin',
      light: isDarkBackground,
      size: isSmallSize ? 'small' : 'medium',
    };
  }

  createItem({ item, isActive, onClick, className }) {
    const breadcrumbText = value => (
      <Text dataHook="breadcrumbs-item" {...this.getTextAppearance(isActive)}>
        {value}
      </Text>
    );

    const defaultBreadcrumb = () => (
      <button
        type="button"
        data-hook="breadcrumb-clickable"
        className={classnames(styles.item, styles.button, className, {
          [styles.disabled]: item.disabled,
          [styles.active]: isActive,
        })}
        onClick={onClick}
        children={breadcrumbText(item.value)}
      />
    );

    const linkBreadcrumb = () => (
      <a
        href={item.link}
        data-hook="breadcrumb-clickable"
        className={classnames(styles.item, styles.link, className, {
          [styles.disabled]: item.disabled,
          [styles.active]: isActive,
        })}
        onClick={onClick}
        children={breadcrumbText(item.value)}
      />
    );

    const customBreadcrumb = () => (
      <span
        data-hook="breadcrumb-clickable"
        className={classnames(styles.item, className)}
        onClick={onClick}
        children={breadcrumbText(item.customElement)}
      />
    );

    if (isActive) {
      return defaultBreadcrumb();
    } else if (item.customElement) {
      return customBreadcrumb();
    } else if (item.link) {
      return linkBreadcrumb();
    } else {
      return defaultBreadcrumb();
    }
  }

  _getIsActive = item => this.props.activeId === item.id;

  _handleItemClick = item => () => !item.disabled && this.props.onClick(item);

  render() {
    const { items, size, theme, activeId } = this.props;

    return (
      <div className={classnames(styles[size], styles[theme])}>
        {items.map((item, i, allItems) => (
          <div
            key={item.id}
            className={classnames(styles.itemContainer, {
              [styles.active]: this._getIsActive(item),
            })}
          >
            {this.createItem({
              item,
              isActive: this._getIsActive(item),
              onClick: this._handleItemClick(item),
              className:
                i === 0 && allItems.length === 1 ? styles.itemFullWidth : '',
            })}

            {allItems[i + 1] && (
              <BreadcrumbsChevronRight className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export const breadcrumbsPathFactory = BreadcrumbsPathFactory;
export default Breadcrumbs;
