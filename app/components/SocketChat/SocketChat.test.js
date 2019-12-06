import React from 'react';
import ReactDOM from 'react-dom';
import SocketChat from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SocketChat variant="primary" onClick={() => {}}>
      This is a button!
    </SocketChat>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
