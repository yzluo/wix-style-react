import * as React from 'react';
import WixComponent,{WixComponentProps} from '../BaseComponents/WixComponent';

export interface Props extends WixComponentProps{
  name : string;
}

export class ExampleTSComp extends WixComponent<Props> {
  render() {
    return (
      <div>
        my name is {this.props.name}
      </div>
    )
  }
}
