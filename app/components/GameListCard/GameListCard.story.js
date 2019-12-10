/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import GameListCard from './index';

const gamesList = [
  {
    id: '1',
    host: 'hazlan',
    numPlayers: 2,
  },
  {
    id: '2',
    host: 'reiner',
    numPlayers: 1,
  },
];

storiesOf('GameListCard', module)
  .addDecorator((story, context) =>
    withInfo(GameListCard.description)(story)(context),
  )
  .add('Games list with a couple games', () => (
    <GameListCard wordList={gamesList} />
  ));
