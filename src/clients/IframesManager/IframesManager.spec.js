import {IframesManager} from './IframesManager';
import {getIframes, getIframeWithLangAndApiKey} from '../IframeTestUtils';
let iframesManager;

describe('IframesManager', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; //remove previous modals from body
    iframesManager = new IframesManager();
  });

  it('should add one iframe to the DOM when trying to add an iframe with same key', () => {
    const apiKey = 'a';
    const lang = 'en';
    iframesManager.addIframe(apiKey, lang);
    iframesManager.addIframe(apiKey, lang);

    expect(getIframes().length).toEqual(1);
    expect(getIframeWithLangAndApiKey(lang, apiKey)).toBeDefined();
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const lang = 'en';

    iframesManager.addIframe(firstApiKey, lang);
    iframesManager.addIframe(secondApiKey, lang);

    expect(getIframes().length).toEqual(2);
    expect(getIframeWithLangAndApiKey(lang, firstApiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(lang, secondApiKey)).toBeDefined();
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different langs', () => {
    const apiKey = 'a';
    const firstLang = 'en';
    const secondLang = 'fr';

    iframesManager.addIframe(apiKey, firstLang);
    iframesManager.addIframe(apiKey, secondLang);

    expect(getIframes().length).toEqual(2);

    expect(getIframeWithLangAndApiKey(firstLang, apiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(secondLang, apiKey)).toBeDefined();
  });

  it('should create 2 iframes on the DOM as 2 requests are using 2 different langs & apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const firstLang = 'en';
    const secondLang = 'fr';

    iframesManager.addIframe(firstApiKey, firstLang);
    iframesManager.addIframe(secondApiKey, secondLang);

    expect(getIframes().length).toEqual(2);

    expect(getIframeWithLangAndApiKey(firstLang, firstApiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(secondLang, secondApiKey)).toBeDefined();
  });
});
