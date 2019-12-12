import React from 'react';
import ReactDOM from 'react-dom';
import OpponentCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <OpponentCard variant="primary" onClick={() => {}}>
      This is a button!
    </OpponentCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
