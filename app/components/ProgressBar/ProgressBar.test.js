import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ProgressBar variant="primary" onClick={() => {}}>
      This is a button!
    </ProgressBar>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
