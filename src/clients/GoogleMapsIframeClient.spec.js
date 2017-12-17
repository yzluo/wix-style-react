import GoogleMapsIframeClient from './GoogleMapsIframeClient';

describe.only('GoogleMapsIframeClient', () => {

  beforeEach(() => {
    document.body.innerHTML = ''; //remove previous modals from body
  });

  it('should add one iframe to the DOM for one request', () => {
    const apiKey = 'a';
    const lang = 'en';
    const request = 'Tel';
    const client = new GoogleMapsIframeClient();
    client.autocomplete(apiKey, lang, {request});

    expect(document.querySelectorAll('iframe').length).toEqual(1);
  });

  it('should use the same iframe for autocomplete in case apiKey & lang are the same', () => {
    const apiKey = 'a';
    const lang = 'en';
    const request = 'Tel';
    const secondRequest = 'Aviv';
    const client = new GoogleMapsIframeClient();
    client.autocomplete(apiKey, lang, {request});
    client.autocomplete(apiKey, lang, {request: secondRequest});

    expect(document.querySelectorAll('iframe').length).toEqual(1);
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const lang = 'en';
    const request = 'Tel';
    const client = new GoogleMapsIframeClient();

    client.autocomplete(firstApiKey, lang, {request});
    client.autocomplete(secondApiKey, lang, {request});

    expect(document.querySelectorAll('iframe').length).toEqual(2);
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different langs', () => {
    const apiKey = 'a';
    const firstLang = 'en';
    const secondLang = 'fr';
    const request = 'Tel';
    const client = new GoogleMapsIframeClient();

    client.autocomplete(apiKey, firstLang, {request});
    client.autocomplete(apiKey, secondLang, {request});

    expect(document.querySelectorAll('iframe').length).toEqual(2);
  });

  it('should create 2 iframes on the DOM as 2 requests are using 2 different langs & apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const firstLang = 'en';
    const secondLang = 'fr';
    const request = 'Tel';
    const client = new GoogleMapsIframeClient();

    client.autocomplete(firstApiKey, firstLang, {request});
    client.autocomplete(secondApiKey, secondLang, {request});

    expect(document.querySelectorAll('iframe').length).toEqual(2);
  });
});
