/* global module */
import React, { useState } from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import TimeCounterCard from './index';

storiesOf('TimeCounterCard', module)
  .addDecorator((story, context) =>
    withInfo(TimeCounterCard.description)(story)(context),
  )
  .add('Time coundown 20 secs', () => {
    const [time, setTime] = useState(20);
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    }
    return <TimeCounterCard countDownTIme={time} />;
  });
