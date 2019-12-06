import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading } from 'evergreen-ui';

import './TimeCounterCard.css';

// Declare a component that returns an HTML button with the given properties
const TimeCounterCard = ({ countDownTIme }) => (
  <Pane>
    <Heading size={900}>{`${countDownTIme}s`}</Heading>
  </Pane>
);

// Description - appears in the storybook item
TimeCounterCard.description = `Time countdown in seconds`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
TimeCounterCard.propTypes = {
  countDownTIme: PropTypes.number,
};

// What properties the component should have when nothing is defined
TimeCounterCard.defaultProps = {
  countDownTIme: 0,
};

export default TimeCounterCard;
