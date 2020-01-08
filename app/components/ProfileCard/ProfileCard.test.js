import React from 'react';
import ReactDOM from 'react-dom';
import ProfileCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ProfileCard variant="primary" onClick={() => {}}>
      This is a button!
    </ProfileCard>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
