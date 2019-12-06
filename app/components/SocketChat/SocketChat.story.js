/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import SocketChat from './index';

const messages = [
  {
    id: '1',
    timestamp: '1',
    sender: 'hazlan',
    message: 'hello there',
  },
  {
    id: '2',
    timestamp: '2',
    sender: 'reiner',
    message: 'hello there',
  },
];

storiesOf('SocketChat', module)
  .addDecorator((story, context) =>
    withInfo(SocketChat.description)(story)(context),
  )
  .add('Localhost default chat', () => <SocketChat />)
  .add('Localhost default chat with a bunch of messages', () => (
    <SocketChat
      messageHistory={messages}
      onSubmit={message => console.log(`message sent ${message}`)}
    />
  ));
