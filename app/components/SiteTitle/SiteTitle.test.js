import React from 'react';
import ReactDOM from 'react-dom';
import SiteTitle from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SiteTitle variant="primary" onClick={() => {}}>
      This is a button!
    </SiteTitle>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
