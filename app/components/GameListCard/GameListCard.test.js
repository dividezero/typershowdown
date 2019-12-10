import React from 'react';
import ReactDOM from 'react-dom';
import GameListCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameListCard variant="primary" onClick={() => {}}>
      This is a button!
    </GameListCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
