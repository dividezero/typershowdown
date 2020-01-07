/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import CreateGameDialog from './index';

storiesOf('CreateGameDialog', module)
  .addDecorator((story, context) =>
    withInfo(CreateGameDialog.description)(story)(context),
  )
  .add('CreateGameDialog with 3 max players', () => (
    <CreateGameDialog isShown maxPlayersOption={3} onConfirm={() => {}} />
  ))
  .add('CreateGameDialog with 5 max players', () => (
    <CreateGameDialog isShown maxPlayersOption={5} onConfirm={() => {}} />
  ));
