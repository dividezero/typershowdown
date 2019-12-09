import React from 'react';
import ReactDOM from 'react-dom';
import FormattedCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FormattedCard variant="primary" onClick={() => {}}>
      This is a button!
    </FormattedCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
