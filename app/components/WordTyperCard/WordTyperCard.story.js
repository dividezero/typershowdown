/* global module */
import React, { useState } from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import WordTyperCard from './index';

storiesOf('WordTyperCard', module)
  .addDecorator((story, context) =>
    withInfo(WordTyperCard.description)(story)(context),
  )
  .add('WordTyper default', () => {
    const [typing, setTyping] = useState('');
    return (
      <WordTyperCard
        currentWord="Duck"
        typingText={typing}
        onChange={({ target: { value } }) => setTyping(value)}
      />
    );
  });
