import s from './PageHeader.scss';
import { isClassExists } from '../../test/utils';
import breadcrumbsDriver from '../Breadcrumbs/Breadcrumbs.driver';

const titleElement = element =>
  element.querySelector('[data-hook="page-header-title"] h2');
const subtitleElement = element =>
  element.querySelector('[data-hook="page-header-subtitle"] span');
const breadcrumbsElement = element =>
  element.querySelector('[data-hook="page-header-breadcrumbs"]');
const actionBarElement = element =>
  element.querySelector('[data-hook="page-header-actionbar"]');
const backButtonElement = element =>
  element.querySelector('[data-hook="page-header-backbutton"]');

export default ({ element }) => ({
  titleText: () => titleElement(element).textContent,
  isTitleExists: () => !!titleElement(element),
  subtitleText: () => subtitleElement(element).textContent,
  isSubtitleExists: () => !!subtitleElement(element),
  isBreadcrumbsExists: () => !!breadcrumbsElement(element),
  breadcrumbsText: () => breadcrumbsElement(element).textContent,
  isActionBarExists: () => !!actionBarElement(element),
  isBackButtonExists: () => !!backButtonElement(element),
  isTitleDarkTheme: () => isClassExists(titleElement(element), 'h1_1'),
  isSubtitleDarkTheme: () => isClassExists(subtitleElement(element), 't1_2'),
  isBackButtonDarkTheme: () =>
    isClassExists(backButtonElement(element), s.darkTheme),
  isBreadcrumbsDarkTheme: () =>
    breadcrumbsDriver({
      element: breadcrumbsElement(element).childNodes[0],
    }).isOnDarkBackground(),
});
