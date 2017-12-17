import {IframeInnerScript} from './IframeUtils';

class GoogleMapsIframeClient{
  constructor() {
    this._iframeMap = new Map();
  }

  getKey(apiKey, lang) {
    return `${apiKey}-${lang}`;
  }

  addIframe(apiKey, lang) {
    const iframe = document.createElement('iframe');
    const iframeKey = this.getKey(apiKey, lang);

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerText = '(' + IframeInnerScript.toString() + ')()';

    iframe.onload = () =>{
      iframe.contentWindow.document.body.appendChild(scriptElement);
      const googleScript = document.createElement('script');
      googleScript.type = 'text/javascript';
      googleScript.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&language=${lang}&callback=() => initAutocomplete(window.google)`;

      iframe.contentWindow.document.body.appendChild(myscript);
    };

    document.body.appendChild(iframe);
    this._iframeMap.set(iframeKey, iframe);
    return iframe;
  }

  autocomplete(apiKey, lang, request) {
    let requestIframe;
    const iframeKey = this.getKey(apiKey, lang);
    if (this._iframeMap.has(iframeKey)) {
      requestIframe = this._iframeMap.get(iframeKey);
    }
    else {
      requestIframe = this.addIframe(apiKey, lang);
    }
  }
}

export default GoogleMapsIframeClient;