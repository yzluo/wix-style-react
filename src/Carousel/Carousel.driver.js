export const carouselDriverFactory = ({ element }) => {
  return {
    exists: () => !!element,
    isLoading: () => {
      const loader = element.querySelector('[data-hook="loader"]');
      return !!loader;
    },
    getImages: () => {
      return element
        .querySelectorAll('[data-hook="carousel-img"]')
        .map(img => img.src);
    },
  };
};
