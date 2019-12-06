import React from 'react';
import ReactDOM from 'react-dom';
import TimeCounterCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TimeCounterCard variant="primary" onClick={() => {}}>
      This is a button!
    </TimeCounterCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
