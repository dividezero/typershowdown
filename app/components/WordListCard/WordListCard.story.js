/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import WordListCard from './index';

const wordList = [
  {
    word: 'hello',
    times: {
      player1: 231,
      player2: 3123,
    },
  },
  {
    word: 'chair',
    times: {
      player1: 231,
      player2: 3123,
    },
  },
  {
    word: 'amphibious',
    times: {
      player1: 231,
      player2: 3123,
    },
  },
  {
    word: 'catering',
    times: {
      player1: 3123,
      player2: 222,
    },
  },
];

const players = [{ username: 'player1' }, { username: 'player2' }, { username: 'player3' }];

storiesOf('WordListCard', module)
  .addDecorator((story, context) =>
    withInfo(WordListCard.description)(story)(context),
  )
  .add('Wordlist with a bunch of words', () => (
    <WordListCard wordList={wordList} players={players} />
  ))
  .add('Wordlist with a bunch more words', () => (
    <WordListCard
      wordList={[
        ...wordList,
        ...wordList.map(word => ({ ...word, word: `${word.word}1` })),
      ]}
      players={players}
    />
  ))
  .add('Wordlist empty', () => <WordListCard />);
