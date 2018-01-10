import React from 'react';
import {storiesOf} from '@storybook/react';
import {GoogleMapsIframeClient} from '../../src/clients/GoogleMapsIframeClient';

const buttonStyle = {
  fontSize: '15px',
  margin: '15px'
};
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
    this.client.placeDetails(apiKey, lang, this.state.inputValue).then(result => this.setState({result: [result]}));
  }

  render() {
    return (
      <div data-hook="story-google-maps-iframe-client">
        <input
          type="text"
          onChange={evt => this.updateInputValue(evt)}
          />
        <button
          style={buttonStyle}
          key="story-button-autocomplete-1"
          onClick={() => this.autocomplete('AIzaSyD62EDVK-7ssPsChsfBiSjEnix4oZHjSsU', 'en')}
          >autocomplete(apiKey1,
          en)
        </button>
        <button
          style={buttonStyle}
          key="story-button-autocomplete-2"
          onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'en')}
          >autocomplete(apiKey2,
          en)
        </button>
        <button
          style={buttonStyle}
          key="story-button-autocomplete-3"
          onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
          >autocomplete(apiKey2,
          fr)
        </button>
        <button
          style={buttonStyle}
          key="story-button-geocode"
          onClick={() => this.geocode('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
          >geocode
        </button>
        <button
          style={buttonStyle}
          key="story-button-placeDetails"
          onClick={() => this.placeDetails('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
          >placeDetails
        </button>
        {this.state.result.length > 0 &&
        <pre>{JSON.stringify(this.state.result, null, 4)}</pre>
        }
      </div>
    );
  }
}

storiesOf('Core', module)
  .add('GoogleMapsIframeClient', () => (
    <Blabla/>
  ));
