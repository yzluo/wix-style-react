# Icons

> SVG Icon base type.

## Usage
~~~js
import { Component } from 'react';
import Favorite from 'wix-style-react/new-icons/Favorite';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <Favorite />;
        <ChevronDown size="24px" className="someclass" />;
      </div>
    );
  }
}
~~~

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| className | string |  | - | Set custom class to svg root of icon |
| size | string |  | - | Set the size of the icon |
| style | object |  | - | Set style object to svg root of icon |
| ***All other Props are passed to the SVG element*** | | | | |

