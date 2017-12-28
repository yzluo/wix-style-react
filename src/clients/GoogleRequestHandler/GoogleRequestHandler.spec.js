import {googleRequestHandler} from './GoogleRequestHandler';
import {EventEmitterMock, GoogleMapsMock} from '../IframeTestUtils';
let dummyGoogleMapsMock, mockRequestId, mockGoogleResult, eventEmitterMock, googleMock, postMessageMock,
  initRequestHandler,
  googleSpy, getPlacePredictionsSpy, geoCodeSpy, getDetailsSpy, mockGetDetailsResult, mockGeocodeResult;

describe('googleRequestHandler', async () => {
  beforeEach(() => {
    postMessageMock = jest.fn();
    dummyGoogleMapsMock = new GoogleMapsMock();
    mockRequestId = 'a';
    mockGoogleResult = ['a'];
    mockGetDetailsResult = ['getDetails'];
    mockGeocodeResult = ['geocode'];
    eventEmitterMock = new EventEmitterMock();
    googleMock = new GoogleMapsMock(
      {
        getPlacePredictions: (request, callback) => {
          callback(mockGoogleResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      },
      {
        geocode: (request, callback) => {
          callback(mockGeocodeResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      },
      {
        getDetails: (request, callback) => {
          callback(mockGetDetailsResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      }
    );
    geoCodeSpy = jest.fn();
    getDetailsSpy = jest.fn();
    getPlacePredictionsSpy = jest.fn();
    googleSpy = new GoogleMapsMock(
      {
        getPlacePredictions: getPlacePredictionsSpy
      },
      {
        geocode: geoCodeSpy
      },
      {
        getDetails: getDetailsSpy
      }
    );
    initRequestHandler = googleRequestHandler(eventEmitterMock);
  });


  it('should call google getPlacePredictions', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy).toBeCalled();
  });

  it('should call google geocode', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      method: 'geocode',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(geoCodeSpy).toBeCalled();
  });

  it('should call google getDetails', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      method: 'getDetails',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getDetailsSpy).toBeCalled();
  });


  it('should return google response to our request once google has been initialized', () => {
    initRequestHandler(googleMock);
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our getPlacesPredictions request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our geocode request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      method: 'geocode',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGeocodeResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our getDetails request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      method: 'getDetails',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGetDetailsResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our requests when the request is posted before google initialization and there is more than 1 request', () => {
    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockGoogleResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should return google response to our diffrent requests when posted before google initialization', () => {
    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    eventEmitterMock.triggerMessage({
      method: 'getDetails',
      data: {
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockGetDetailsResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should return google response for our requests when one is called before initialization and the other after', () => {
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(1);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );

    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockGoogleResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should wrap request with an object if needed', () => {
    const input = 'input';
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId,
        request: input
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy.mock.calls[0][0]).toEqual({input});
  });

  it('should not wrap request if it is already wrapped', () => {
    const input = 'input';
    initRequestHandler(googleSpy);

    eventEmitterMock.triggerMessage({
      method: 'getPlacePredictions',
      data: {
        requestId: mockRequestId,
        request: {input}
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy.mock.calls[0][0]).toEqual({input});
  });
});
