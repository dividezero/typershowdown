import React from 'react';
import ReactDOM from 'react-dom';
import UsernameDialog from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UsernameDialog variant="primary" onClick={() => {}}>
      This is a button!
    </UsernameDialog>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
