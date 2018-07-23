import React from 'react';
import PropTypes from 'prop-types';
import Input from 'wix-style-react/Input';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px',
};

const Example = ({ theme }) => (
  <div>
    <div className="ltr" style={style}>
      Left to right<Input theme={theme} error />
    </div>
    <div className="rtl" style={style}>
      Right to left<Input theme={theme} rtl error />
    </div>
    <div className="ltr" style={style}>
      Error with tooltip<Input
        theme={theme}
        error
        errorMessage="I am a message"
      />
    </div>
  </div>
);

Example.propTypes = {
  theme: PropTypes.string,
};

export default Example;
