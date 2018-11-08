export default ({element}) => {
  const classExists = className => element.classList.contains(className);

  return {
    exists: () => !!element,
    headerTextContent: () => element.querySelector('[data-hook="generic-layout-header"]').textContent,
    contentTextContent: () => element.querySelector('[data-hook="generic-layout-content"]').textContent,
    footerTextContent: () => element.querySelector('[data-hook="generic-layout-footer"]').textContent,
    isFullscreen: () => classExists('fullscreenContainer')
  };
};
