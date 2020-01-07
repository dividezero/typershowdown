import React from 'react';
import ReactDOM from 'react-dom';
import CreateGameDialog from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreateGameDialog variant="primary" onClick={() => {}}>
      This is a button!
    </CreateGameDialog>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
