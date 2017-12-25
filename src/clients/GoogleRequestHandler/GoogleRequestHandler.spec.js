import {GoogleRequestHandler} from './GoogleRequestHandler';
import {EventEmitterMock, GoogleMapsMock} from '../IframeTestUtils';
let dummyGoogleMapsMock, mockRequestId, mockGoogleResult, eventEmitterMock, googleMock, postMessageMock, requestHandler;

describe.only('GoogleRequestHandler', async () => {
  beforeEach(() => {
    postMessageMock = jest.fn();
    dummyGoogleMapsMock = new GoogleMapsMock();
    mockRequestId = 'a';
    mockGoogleResult = ['a'];
    eventEmitterMock = new EventEmitterMock();
    googleMock = new GoogleMapsMock({
      getPlacePredictions: (request, callback) => {
        callback(mockGoogleResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
      }
    });
    requestHandler = new GoogleRequestHandler(eventEmitterMock);
  });
  it('should return google response to our request once google has been initialized', () => {
    requestHandler.initAutocomplete(googleMock);
    eventEmitterMock.triggerMessage({
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

  it('should return google response to our request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    requestHandler.initAutocomplete(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our requests when the request is posted before google initialization and there is more than 1 request', () => {
    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    eventEmitterMock.triggerMessage({
      data: {
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    requestHandler.initAutocomplete(googleMock);
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

  it('should return google response for our requests when one is called before initialization and the other after', () => {
    eventEmitterMock.triggerMessage({
      data: {
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    requestHandler.initAutocomplete(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(1);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGoogleResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );

    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
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
});
