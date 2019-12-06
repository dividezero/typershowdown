import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import TyperShowdownPage from '../index';

describe('<TyperShowdownPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <TyperShowdownPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
