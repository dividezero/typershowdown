/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import SiteTitle from './index';

storiesOf('SiteTitle', module)
  .addDecorator((story, context) =>
    withInfo(SiteTitle.description)(story)(context),
  )
  .add('Title default', () => <SiteTitle title="Typer Showdown!" />);
