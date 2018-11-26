import React, { Children } from 'react';

import Label from '../../src/Label';
import Input from '../../src/Input';
import { children, once } from '../../src/Composite';

const CompositeExample = ({ children }) => {
  const [label, input] = Children.toArray(children);
  return (
    <div>
      <div>{input}</div>
      <div>{label}</div>
    </div>
  );
};

CompositeExample.propTypes = {
  children: children(once(Label), once(Input)),
};

export default () => (
  <div>
    <CompositeExample>
      <Label>Computers do not solve problems, they execute solutions</Label>
      <Input />
    </CompositeExample>
  </div>
);
