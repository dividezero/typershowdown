import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import TyperShowdownLobbyPage from '../index';

describe('<TyperShowdownLobbyPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <TyperShowdownLobbyPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
