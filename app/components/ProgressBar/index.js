import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

// Declare a component that returns an HTML button with the given properties
const ProgressBar = ({ progress }) => (
  <div className="progress">
    <div
      className="progress-bar progress-bar-striped progress-bar-animated"
      style={{
        width: `${progress}%`,
      }}
    />
  </div>
);

// Description - appears in the storybook item
ProgressBar.description = `Progress Bar`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

// What properties the component should have when nothing is defined
ProgressBar.defaultProps = {};

export default ProgressBar;
