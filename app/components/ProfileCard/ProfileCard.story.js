/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import ProfileCard from './index';

storiesOf('ProfileCard', module)
  .addDecorator((story, context) =>
    withInfo(ProfileCard.description)(story)(context),
  )
  .add('ProfileCard just name', () => <ProfileCard name="John Doe" />)
  .add('ProfileCard without profile url', () => (
    <ProfileCard name="John Doe" status="Serial typist" />
  ))
  .add('ProfileCard complete', () => (
    <ProfileCard
      name="John Doe"
      status="Serial typist"
      profileUrl="https://www.hazlanrozaimi.com/icons/icon-144x144.png?v=79babf3a7d22ec75b293dd0054b50eec"
    />
  ))
  .add('ProfileCard invalid url', () => (
    <ProfileCard
      name="John Doe"
      status="Serial typist"
      profileUrl="not a valid url"
    />
  ));
