/* global module */
import React, { useState } from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import ReadyButtonCard from './index';

storiesOf('ReadyButtonCard', module)
  .addDecorator((story, context) =>
    withInfo(ReadyButtonCard.description)(story)(context),
  )
  .add('ReadyButtonCard default', () => {
    const [ready, setReady] = useState(false);
    return (
      <ReadyButtonCard
        ready={ready}
        onClick={() => {
          setReady(!ready);
        }}
      />
    );
  });
