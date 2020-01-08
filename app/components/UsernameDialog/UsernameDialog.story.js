/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import UsernameDialog from './index';

storiesOf('UsernameDialog', module)
  .addDecorator((story, context) =>
    withInfo(UsernameDialog.description)(story)(context),
  )
  .add('UsernameDialog default', () => (
    <UsernameDialog isShown onConfirm={() => {}} />
  ))
  .add('UsernameDialog no preview', () => (
    <UsernameDialog isShown showPreview={false} />
  ));
