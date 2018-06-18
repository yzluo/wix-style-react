import * as React from 'react';

export interface Props {
  name : string;
}
export class ExampleTSComp extends React.Component<Props,{}> {
  render() {
    return (
      <div>
        my name is {this.props.name}
      </div>
    )
  }
}
