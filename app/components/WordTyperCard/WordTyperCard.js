import React from 'react';
import ReactDOM from 'react-dom';
import WordTyperCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WordTyperCard variant="primary" onClick={() => {}}>
      This is a button!
    </WordTyperCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
