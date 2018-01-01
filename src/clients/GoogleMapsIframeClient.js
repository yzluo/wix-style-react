import {IframesManager} from './IframesManager/IframesManager';
import {autocompleteHandlerName, geocodeHandlerName, placeDetailsHandlerName} from './handlersName';

export class GoogleMapsIframeClient {
  constructor() {
    this._iframesManager = new IframesManager();
    this._promisesMap = new Map();
    window.addEventListener('message', this.handleMessage, false);
  }

  handleMessage = event => {
    const {data} = event;
    if (data.requestId && this._promisesMap.has(data.requestId)) {
      const promise = this._promisesMap.get(data.requestId);
      data.status === 'OK' ? promise.resolve(data.results) : promise.reject();
    }
  };

  generateID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  autocomplete(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = this.generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: autocompleteHandlerName}, '*');
    return requestPromise;
  }

  geocode(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = this.generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    console.log(request, 'request');
    console.log(requestId, 'requestId');
    console.log(geocodeHandlerName, 'geocodeHandlerName');

    requestIframe.postMessage({request, requestId, method: geocodeHandlerName}, '*');
    return requestPromise;
  }

  placeDetails(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = this.generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });
    requestIframe.postMessage({request, requestId, method: placeDetailsHandlerName}, '*');
    return requestPromise;
  }
}
