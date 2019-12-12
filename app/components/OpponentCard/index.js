import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Pane, Heading, Tooltip } from 'evergreen-ui';

import './OpponentCard.css';
import FormattedCard from '../FormattedCard';
import ProgressBar from '../ProgressBar';

// Declare a component that returns an HTML button with the given properties
const OpponentCard = ({ name, typing, progress, readyState, gameOngoing }) => (
  <FormattedCard
    cellWidth={3}
    cellHeight={1}
    display="flex"
    flexDirection="row"
  >
    <Pane marginRight={16}>
      <Tooltip content={name}>
        <Avatar isSolid name={name} size={60} />
      </Tooltip>
    </Pane>

    {gameOngoing ? (
      <Pane
        marginLeft={8}
        display="flex"
        flexDirection="column"
        width="100%"
        flexGrow={2}
      >
        <Heading
          size={800}
          marginBottom={8}
          textAlign="center"
          color="darkgrey"
        >
          {typing}
        </Heading>
        <ProgressBar progress={progress || 0} />
      </Pane>
    ) : (
      <Heading size={800} flexGrow={2} textAlign="center">
        {readyState? 'Ready': 'Not Ready'}
      </Heading>
    )}
  </FormattedCard>
);

// Description - appears in the storybook item
OpponentCard.description = `Opponent status`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
OpponentCard.propTypes = {
  name: PropTypes.string.isRequired,
  typing: PropTypes.string,
  progress: PropTypes.number,
  readyState: PropTypes.bool,
  gameOngoing: PropTypes.bool,
};

// What properties the component should have when nothing is defined
OpponentCard.defaultProps = {
  typing: '',
  progress: 0,
  readyState: false,
  gameOngoing: false,
};

export default OpponentCard;
