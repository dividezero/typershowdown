import React from 'react';
import ReactDOM from 'react-dom';
import ReadyButtonCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ReadyButtonCard variant="primary" onClick={() => {}}>
      This is a button!
    </ReadyButtonCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
