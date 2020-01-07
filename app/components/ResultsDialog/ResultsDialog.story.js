/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import ResultsDialog from './index';

const wordList = [
  {
    word: 'duck',
    times: {
      player1: 100,
      player2: 200,
      player3: 300,
    },
  },
  {
    word: 'brother',
    times: {
      player1: 100,
      player2: 200,
    },
  },
  {
    word: 'something',
    times: {
      player1: 100,
    },
  },
];

storiesOf('ResultsDialog', module)
  .addDecorator((story, context) =>
    withInfo(ResultsDialog.description)(story)(context),
  )
  .add('ResultsDialog win', () => (
    <ResultsDialog
      isShown
      wordList={wordList}
      username="player1"
      onRestart={() => {}}
    />
  ))
  .add('ResultsDialog lose', () => (
    <ResultsDialog
      isShown
      username="player2"
      onRestart={() => {}}
      wordList={wordList}
    />
  ));
