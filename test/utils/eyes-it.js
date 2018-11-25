import eyes from 'eyes.it';

/**
 * Create an instance of eyes.it with a default configure options.
 * All instances share the same eyes singleton which is already initialized.
 */
export function eyesItInstance(config) {
  return new Proxy(eyes, { // eslint-disable-line no-restricted-globals
    get: (obj, prop) => {
      if (prop === 'it' || prop === 'fit') {
        return (msg, f) => obj[prop](msg, f, config);
      }
      return obj[prop];
    }
  });
}
