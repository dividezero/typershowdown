/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import OpponentCard from './index';

storiesOf('OpponentCard', module)
  .addDecorator((story, context) =>
    withInfo(OpponentCard.description)(story)(context),
  )
  .add('OpponentCard on going game', () => (
    <OpponentCard name="John Doe" progress={0.2} typing="duc" gameOngoing />
  ))
  .add('OpponentCard not ready', () => (
    <OpponentCard
      name="John Doe"
      progress={0.2}
      typing="duc"
      readyState={false}
      gameOngoing={false}
    />
  ))
  .add('OpponentCard ready ready', () => (
    <OpponentCard
      name="John Doe"
      progress={0.2}
      typing="duc"
      readyState
      gameOngoing={false}
    />
  ));
