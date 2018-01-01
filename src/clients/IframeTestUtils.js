const LANGUAGE_PARAM_NAME = 'language';
const API_KEY_PARAM_NAME = 'key';

export const getIframes = () => document.querySelectorAll('iframe');

export const getIframeWithLangAndApiKey = (lang, apiKey) => {
  const iframes = getIframes();
  for (const iframe of iframes) {
    const iframeScripts = iframe.contentWindow.document.querySelectorAll('script');
    for (const iframeScript of iframeScripts) {
      if (iframeScript.src.includes(`&${LANGUAGE_PARAM_NAME}=${lang}`) && iframeScript.src.includes(`${API_KEY_PARAM_NAME}=${apiKey}&`)) {
        return iframe;
      }
    }
  }
  return undefined;
};

export const isIframeVisible = iframe => iframe.style.display !== 'none';

export const triggerIframeInitAutocomplete = (mockedGoogleInstance, lang, apiKey) => {
  const iframe = getIframeWithLangAndApiKey(lang, apiKey);
  iframe.contentWindow.initAutocomplete(mockedGoogleInstance);
};

export const GoogleMapsMock = (autocompleteInstance, geocoderInstance, placesServiceInstance) => {
  return {
    maps: {
      Map: () => {
      },
      places: {
        AutocompleteService: () => autocompleteInstance,
        PlacesService: () => placesServiceInstance,
        PlacesServiceStatus: {
          OK: 'OK',
          ZERO_RESULTS: 'ZERO_RESULTS'
        },
        AutocompleteServiceStatus: {
          OK: 'OK',
          ERROR: 'ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS'
        }
      },
      Geocoder: () => geocoderInstance,
      GeocoderStatus: {
        OK: 'OK',
        ZERO_RESULTS: 'ZERO_RESULTS'
      }
    }
  };
}

export class EventEmitterMock {
  constructor() {
    this.eventListeners = [];
  }

  addEventListener(eventName, callback) {
    this.eventListeners.push(callback);
  }

  triggerMessage(event) {
    this.eventListeners.forEach((callback) => callback(event));
  }
}