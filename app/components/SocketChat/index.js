import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Pane, TextInput, Code } from 'evergreen-ui';

import './SocketChat.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const SocketChat = ({ onSubmit, messageHistory }) => {
  const [text, setText] = useState('');
  const onSubmitMessage = e => {
    if (e.key === 'Enter' && text) {
      onSubmit(text);
      setText('');
      messagesEndRef.current.scrollIntoView();
    }
  };
  const messagesEndRef = useRef(null);
  return (
    <FormattedCard>
      <Pane
        width="100%"
        style={{
          height: '50vh',
          padding: 8,
          overflowY: 'scroll',
        }}
      >
        {messageHistory &&
          messageHistory.map(({ id, sender, message }) => (
            <div key={id}>
              <Code
                appearance="minimal"
                color="cornflowerblue"
              >{`${sender}: `}</Code>
              <Code appearance="minimal">{message}</Code>
            </div>
          ))}
        <div ref={messagesEndRef} style={{ marginTop: 50 }} />
      </Pane>

      <TextInput
        size={600}
        value={text}
        placeholder="Type a message..."
        onChange={event => setText(event.target.value)}
        width="100%"
        onKeyDown={onSubmitMessage}
      />
    </FormattedCard>
  );
};

// Description - appears in the storybook item
SocketChat.description = `Chat with the group selected`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
SocketChat.propTypes = {
  onSubmit: PropTypes.func,
  messageHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      timestamp: PropTypes.number,
      message: PropTypes.string,
      sender: PropTypes.string,
    }),
  ),
};

// What properties the component should have when nothing is defined
SocketChat.defaultProps = {
  onSubmit: () => {},
  messageHistory: [],
};

export default SocketChat;
