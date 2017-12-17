export const IframeInnerScript = function () {
  window.initAutocomplete = function initAutocomplete(googleInstance) {
    const autocomplete = new googleInstance.maps.places.AutocompleteService();

    function handleGoogleRequest(event) {
      autocomplete.getPlacePredictions(event.data, (results, status) => {
        if ((status !== googleInstance.maps.GeocoderStatus.OK) && (status !== googleInstance.maps.GeocoderStatus.ZERO_RESULTS)) {
          event.source.postMessage({results, status: 'ERROR'}, event.origin);
        } else {
          event.source.postMessage({results, status: 'OK'}, event.origin);
        }
      });
    }

    window.addEventListener('message', handleGoogleRequest, false);
  };
};
