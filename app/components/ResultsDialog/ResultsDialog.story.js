/* global module */
import React from 'react';
import { storiesOf, withInfo } from '../../../.storybook/stories';

import ResultsDialog from './index';

storiesOf('ResultsDialog', module)
  .addDecorator((story, context) =>
    withInfo(ResultsDialog.description)(story)(context),
  )
  .add('ResultsDialog win', () => (
    <ResultsDialog
      isShown
      timeTaken={400}
      timeTaken2={300}
      wordsCompleted={20}
      wordsCompleted2={15}
    />
  ))
  .add('ResultsDialog lose', () => (
    <ResultsDialog
      isShown
      timeTaken={400}
      timeTaken2={300}
      wordsCompleted={15}
      wordsCompleted2={20}
    />
  ));
