export const GoogleRequestHandler = function (eventEmitter) {
  const context = {
    handleGoogleRequest,
    requestsQueue: []
  };

  function handleGoogleRequest(event) {
    !context.autocomplete ? addToQueue(event) : handleRequest(event);
  }

  function addToQueue(event) {
    context.requestsQueue.unshift(event);
  }

  function handleRequest(event) {
    context.autocomplete.getPlacePredictions(event.data.request, (results, status) => {
      if ((status !== context.googleInstance.maps.GeocoderStatus.OK) && (status !== context.googleInstance.maps.GeocoderStatus.ZERO_RESULTS)) {
        event.source.postMessage({results, status: 'ERROR', requestId: event.data.requestId}, '*');
      } else {
        event.source.postMessage({results, status: 'OK', requestId: event.data.requestId}, '*');
      }
    });
  }

  this.initAutocomplete = function initAutocomplete(googleInstance) {
    context.autocomplete = new googleInstance.maps.places.AutocompleteService();
    context.googleInstance = googleInstance;
    context.requestsQueue.forEach(request => handleRequest(request));
  };

  eventEmitter.addEventListener('message', context.handleGoogleRequest, false);
};
