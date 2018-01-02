import {getStoryUrl, waitForVisibilityOf, googleMapsIframeClientTestkitFactory} from '../../testkit/protractor';

fdescribe('Google Maps Iframe client', () => {
  const storyUrl = getStoryUrl('Core', 'GoogleMapsIframeClient');
  const dataHook = 'story-google-maps-iframe-client';
  const buttonDataHooks = {
    autocompleteApiKey1En: 'autocomplete(apiKey1, en)',
    autocompleteApiKey2En: 'autocomplete(apiKey2, en)',
    autocompleteApiKey2fr: 'autocomplete(apiKey2, fr)',
    geocode: 'geocode',
    placeDetails: 'placeDetails'
  };

  it('should ask google to autocomplete and return relevant values', async () => {
    await browser.get(storyUrl);

    const driver = googleMapsIframeClientTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cant find Button Selection Component');

    await driver.enterText('broadway');
    await driver.selectByValue(buttonDataHooks.autocompleteApiKey1En);

    await waitForVisibilityOf($('pre'));
    const results = await driver.getParsedResults();
    console.log(results);
  });

  it('should ask google to geocode and return relevant values', async () => {
    await browser.get(storyUrl);

    const driver = googleMapsIframeClientTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cant find Button Selection Component');

    await driver.enterText('broadway');
    await driver.selectByValue(buttonDataHooks.geocode);

    await waitForVisibilityOf($('pre'));
    const results = await driver.getParsedResults();
    console.log(results);
  });
});
