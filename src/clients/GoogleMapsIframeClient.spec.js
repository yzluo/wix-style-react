import {GoogleMapsIframeClient} from './GoogleMapsIframeClient';

let client;

const mockApiKey = 'a';
const mockLang = 'en';


jest.mock('./IframesManager/IframesManager');
const frameManager = require('./IframesManager/IframesManager');
const iframeManagerPrototype = frameManager.IframesManager.prototype;

describe('GoogleMapsIframeClient', () => {
  it('should return a resolved promise once the status sent by iframesManager is OK', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        global.postMessage({requestId, results: [], status: 'OK'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).resolves.toEqual([]);
    expect(iframeManagerPrototype.getIframe).toBeCalled();
  });

  it('should return a rejected promise once the status sent by iframesManager is ERROR', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        global.postMessage({requestId, results: [], status: 'ERROR'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).rejects.toEqual();
    expect(iframeManagerPrototype.getIframe).toBeCalled();
  });

  it('should return results and trigger addIframe if the iframe does not exist', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        global.postMessage({requestId, results: [], status: 'OK'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).resolves.toEqual([]);
    expect(iframeManagerPrototype.addIframe).toBeCalled();
  });

  it('should return a rejected promise and trigger addIframe if the iframe does not exist', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        global.postMessage({requestId, results: [], status: 'ERROR'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).rejects.toEqual();
    expect(iframeManagerPrototype.addIframe).toBeCalled();
  });

  it('should resolve 2 requests', async () => {
    const firstRequest = 'first';
    const secondRequest = 'second';

    iframeManagerPrototype.hasIframe.mockImplementation(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId, request} = requestObj;
        const timeout = request === firstRequest ? 200 : 100;
        setTimeout(() => global.postMessage({requestId, results: [request], status: 'OK'}, targetOrigin), timeout);
      }
    })
    );

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, secondRequest)).resolves.toEqual([secondRequest]);
    await expect(client.autocomplete(mockApiKey, mockLang, firstRequest)).resolves.toEqual([firstRequest]);

    iframeManagerPrototype.hasIframe.mockRestore();
    iframeManagerPrototype.getIframe.mockRestore();
  });

  it('should reject first requests and resolve the second one', async () => {
    const firstRequest = 'first';
    const secondRequest = 'second';

    iframeManagerPrototype.hasIframe.mockImplementation(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId, request} = requestObj;
        const timeout = request === firstRequest ? 200 : 100;
        const status = request === firstRequest ? 'OK' : 'ERROR';
        setTimeout(() => global.postMessage({requestId, results: [request], status}, targetOrigin), timeout);
      }
    })
    );

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, secondRequest)).rejects.toEqual();
    await expect(client.autocomplete(mockApiKey, mockLang, firstRequest)).resolves.toEqual([firstRequest]);

    iframeManagerPrototype.hasIframe.mockRestore();
    iframeManagerPrototype.getIframe.mockRestore();
  });
});
