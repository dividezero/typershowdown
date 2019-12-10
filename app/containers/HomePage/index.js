/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput } from 'evergreen-ui';
import SockJS from 'sockjs-client';
import messages from './messages';
import SocketChat from '../../components/SocketChat';

const sock = new SockJS('http://localhost:7070/websocket');

const channelId = 'chat';
sock.onopen = () => {
  console.log('open');
  // sock.send('test');
  sock.send(JSON.stringify({ action: 'joinChannel', channelId }));
};

sock.onclose = () => {
  console.log('close');
};

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  sock.onmessage = e => {
    console.log('recieved', JSON.parse(e.data));
    setMessageHistory([...messageHistory, JSON.parse(e.data)]);
  };

  const createMessage = newMessage => ({
    id: new Date().getTime(),
    timestamp: new Date().getTime(),
    message: newMessage,
    sender: username,
    channelId,
  });

  const submitMessage = submittedMessage => {
    if (username) {
      const newMessage = createMessage(submittedMessage);
      console.log('sending', newMessage);
      sock.send(JSON.stringify(newMessage));
    } else {
      alert('please enter username');
    }
  };
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
      <div>
        <TextInput
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          padding={8}
        />
        <SocketChat onSubmit={submitMessage} messageHistory={messageHistory} />
      </div>
    </div>
  );
}
