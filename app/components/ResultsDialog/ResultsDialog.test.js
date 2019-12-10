import React from 'react';
import ReactDOM from 'react-dom';
import ResultsDialog from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ResultsDialog variant="primary" onClick={() => {}}>
      This is a button!
    </ResultsDialog>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
