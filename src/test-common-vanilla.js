export const findByHook = (element, hook) => element.querySelector(`[data-hook*="${hook}"]`);

export const resolveIn = timeout =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
