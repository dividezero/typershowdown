/* global module */
import React from 'react';
import { Text } from 'evergreen-ui';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import FormattedCard from './index';

storiesOf('FormattedCard', module)
  .addDecorator((story, context) =>
    withInfo(FormattedCard.description)(story)(context),
  )
  .add('WordTyper default', () => (
    <FormattedCard width={300} height={200}>
      <Text size={600}>Some text</Text>
    </FormattedCard>
  ));
