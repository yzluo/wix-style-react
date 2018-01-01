import React from 'react';
import {storiesOf} from '@storybook/react';
import {GoogleMapsIframeClient} from '../../src/clients/GoogleMapsIframeClient';

class Blabla extends React.Component {
  constructor() {
    super();

    this.state = {result: {}, inputValue: ''};
    this.client = new GoogleMapsIframeClient();
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  autocomplete(apiKey, lang) {
    this.client.autocomplete(apiKey, lang, this.state.inputValue).then(result => this.setState({result}));
  }

  geocode(apiKey, lang) {
    this.client.geocode(apiKey, lang, this.state.inputValue).then(result => this.setState({result}));
  }

  placeDetails(apiKey, lang) {
    this.client.placeDetails(apiKey, lang, this.state.inputValue).then(result => this.setState({result}));
  }

  render() {
    console.log(this.state.result);
    return (
      <div>
        <input
          type="text"
          onChange={evt => this.updateInputValue(evt)}
        />
        <button onClick={() => this.autocomplete('AIzaSyD62EDVK-7ssPsChsfBiSjEnix4oZHjSsU', 'en')}>autocomplete(apkKey1,
          en)
        </button>
        <button onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'en')}>autocomplete(apkKey2,
          en)
        </button>
        <button onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}>autocomplete(apkKey2,
          fr)
        </button>
        <button onClick={() => this.geocode('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}>geocode(apkKey2,
          fr)
        </button>
        <button onClick={() => this.placeDetails('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}>placeDetails(apkKey2,
          fr)
        </button>
        <pre>{JSON.stringify(this.state.result, null, 4)}</pre>
      </div>
    );
  }
}

storiesOf('Core', module)
  .add('GoogleMapsIframeClient', () => (
    <Blabla/>
  ));
