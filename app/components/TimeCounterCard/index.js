import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'evergreen-ui';
import FormattedCard from '../FormattedCard';

import './TimeCounterCard.css';

// Declare a component that returns an HTML button with the given properties
const TimeCounterCard = ({ title, countDownTIme }) => (
  <FormattedCard cellWidth={2} cellHeight={2}>
    <Heading size={700} padding={8}>
      {title}
    </Heading>
    <Heading
      size={900}
      padding={8}
      fontSize={56}
    >{`${countDownTIme}s`}</Heading>
  </FormattedCard>
);

// Description - appears in the storybook item
TimeCounterCard.description = `Time countdown in seconds`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
TimeCounterCard.propTypes = {
  title: PropTypes.string,
  countDownTIme: PropTypes.number,
};

// What properties the component should have when nothing is defined
TimeCounterCard.defaultProps = {
  title: '',
  countDownTIme: 0,
};

export default TimeCounterCard;
