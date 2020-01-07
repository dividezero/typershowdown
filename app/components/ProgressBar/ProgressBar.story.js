/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import ProgressBar from './index';

storiesOf('ProgressBar', module)
  .addDecorator((story, context) =>
    withInfo(ProgressBar.description)(story)(context),
  )
  .add('ProgressBar at 25%', () => <ProgressBar progress={0.25} />)
  .add('ProgressBar 60%', () => <ProgressBar progress={0.6} />)
  .add('ProgressBar 100%', () => <ProgressBar progress={1} />);
