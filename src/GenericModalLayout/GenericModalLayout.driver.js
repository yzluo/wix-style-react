export default ({element}) => {
  const classExists = className => element.classList.contains(className);

  return {
    getElement: () => element,
    exists: () => !!element,
    isFullscreen: () => classExists('fullscreenContainer')
  };
};
