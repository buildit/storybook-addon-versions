import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>
    {label}
  </button>
);

Button.displayName = 'Button';
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
