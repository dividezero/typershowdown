/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import WordListCard from './index';

const wordList = [
  {
    word: 'hello',
    typedTime1: 1234,
    typedTime2: 2314,
  },
  {
    word: 'chair',
    typedTime1: 2314,
    typedTime2: 1234,
  },
  {
    word: 'amphibious',
    typedTime1: 1234,
    typedTime2: 2314,
  },
  {
    word: 'catering',
    typedTime1: 2314,
    typedTime2: 2134,
  },
];

storiesOf('WordListCard', module)
  .addDecorator((story, context) =>
    withInfo(WordListCard.description)(story)(context),
  )
  .add('Wordlist with a bunch of words', () => (
    <WordListCard wordList={wordList} />
  ))
  .add('Wordlist with a bunch more words', () => (
    <WordListCard
      wordList={[
        ...wordList,
        ...wordList.map(word => ({ ...word, word: `${word.word}1` })),
      ]}
    />
  ))
  .add('Wordlist empty', () => <WordListCard />);
