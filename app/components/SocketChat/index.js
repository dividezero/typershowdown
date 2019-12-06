import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './SocketChat.css';

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
    <div>
      <div
        style={{
          height: '50vh',
          width: 500,
          padding: 8,
          overflowY: 'scroll',
          backgroundColor: 'white',
        }}
      >
        {messageHistory &&
          messageHistory.map(({ id, sender, message }) => (
            <p key={id}>{`${sender}: ${message}`}</p>
          ))}
        <div ref={messagesEndRef} style={{ marginTop: 50 }} />
      </div>

      <input
        value={text}
        placeholder="type a message..."
        onKeyDown={onSubmitMessage}
        onChange={event => {
          setText(event.target.value);
        }}
        style={{
          padding: 8,
          width: 500,
        }}
      />
    </div>
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
