import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, TextInput } from 'evergreen-ui';

import './WordTyperCard.css';

// Declare a component that returns an HTML button with the given properties
const WordTyperCard = ({ currentWord, typingText, onChange }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    margin={16}
  >
    <Pane marginBottom={16}>
      <Heading size={900}>{currentWord}</Heading>
    </Pane>
    <Pane>
      <TextInput
        size={600}
        value={typingText}
        placeholder={currentWord}
        onChange={onChange}
      />
    </Pane>
  </Pane>
);

// Description - appears in the storybook item
WordTyperCard.description = `The arena where the user types`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
WordTyperCard.propTypes = {
  currentWord: PropTypes.string,
  typingText: PropTypes.string,
  onChange: PropTypes.func,
};

// What properties the component should have when nothing is defined
WordTyperCard.defaultProps = {
  currentWord: '',
  typingText: '',
  onChange: () => {},
};

export default WordTyperCard;
