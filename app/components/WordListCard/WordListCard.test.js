import React from 'react';
import ReactDOM from 'react-dom';
import WordListCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WordListCard variant="primary" onClick={() => {}}>
      This is a button!
    </WordListCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
