import React from 'react';
import * as Composite from '../Composite';
import Label from '../Label';
import AutoComplete from '../AutoComplete';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const AutoCompleteComposite = ({ children, ...props }) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

AutoCompleteComposite.propTypes = {
  children: Composite.children(
    Composite.optional(Label),
    Composite.once(AutoComplete),
  ),
};

AutoCompleteComposite.displayName = 'AutoCompleteComposite';

export default AutoCompleteComposite;
