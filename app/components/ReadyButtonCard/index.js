import React from 'react';
import PropTypes from 'prop-types';
import { Button, Heading } from 'evergreen-ui';

import { getCardWidth } from '../../theme/layout';
import './ReadyButtonCard.css';

// Declare a component that returns an HTML button with the given properties
const ReadyButtonCard = ({ ready, onClick }) => (
  <Button
    appearance="primary"
    intent={ready ? 'danger' : 'none'}
    height={getCardWidth(1)}
    width={getCardWidth(6)}
    margin={8}
    padding={8}
    onClick={onClick}
  >
    <Heading size={900} color="white" textAlign="center" width="100%">
      {ready ? 'UNREADY' : 'READY'}
    </Heading>
  </Button>
);

// Description - appears in the storybook item
ReadyButtonCard.description = `The arena where the user types`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
ReadyButtonCard.propTypes = {
  ready: PropTypes.bool,
  onClick: PropTypes.func,
};

// What properties the component should have when nothing is defined
ReadyButtonCard.defaultProps = {
  ready: false,
  onClick: () => {},
};

export default ReadyButtonCard;
