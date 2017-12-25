import {GoogleRequestHandler} from '../GoogleRequestHandler/GoogleRequestHandler';

export class IframesManager {
  constructor() {
    this._iframeMap = new Map();
  }

  getKey(apiKey, lang) {
    return `${apiKey}-${lang}`;
  }

  addIframe(apiKey, lang) {
    if (this.hasIframe(apiKey, lang)) {
      return this.getIframe(apiKey, lang);
    }

    const iframeKey = this.getKey(apiKey, lang);
    const iframe = document.createElement('iframe');

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerText = '(' + GoogleRequestHandler.toString() + ')(window)'; //iframe's window

    iframe.onload = () => {
      iframe.contentWindow.document.body.appendChild(scriptElement);
      const googleScript = document.createElement('script');
      googleScript.type = 'text/javascript';
      googleScript.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&language=${lang}&callback=() => initAutocomplete(window.google)`;

      iframe.contentWindow.document.body.appendChild(googleScript);
    };

    document.body.appendChild(iframe);
    this._iframeMap.set(iframeKey, iframe);
    return iframe;
  }

  getIframe(apiKey, lang) {
    const iframeKey = this.getKey(apiKey, lang);
    return this._iframeMap.get(iframeKey);
  }

  hasIframe(apiKey, lang) {
    const iframeKey = this.getKey(apiKey, lang);
    return this._iframeMap.has(iframeKey);
  }
}

