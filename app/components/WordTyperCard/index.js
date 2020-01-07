import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading } from 'evergreen-ui';

import './WordTyperCard.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const WordTyperCard = ({ currentWord, typingText, disabled, onChange }) => {
  const textInputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      textInputRef.current.focus();
    }
  }, [disabled]);
  return (
    <FormattedCard cellWidth={4} cellHeight={2} paddingX={16}>
      <Pane paddingBottom={24}>
        <Heading size={900} className="unselectable">
          {currentWord}
        </Heading>
      </Pane>
      <Pane width="100%">
        <input
          type="text"
          ref={textInputRef}
          value={typingText}
          disabled={disabled}
          placeholder={currentWord}
          onChange={e => onChange(e.target.value)}
          style={{
            fontSize: 32,
            outline: 'none',
            width: '100%',
            padding: 24,
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        />
      </Pane>
    </FormattedCard>
  );
};

// Description - appears in the storybook item
WordTyperCard.description = `The arena where the user types`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
WordTyperCard.propTypes = {
  currentWord: PropTypes.string,
  typingText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

// What properties the component should have when nothing is defined
WordTyperCard.defaultProps = {
  currentWord: '',
  typingText: '',
  disabled: false,
  onChange: () => {},
};

export default WordTyperCard;
