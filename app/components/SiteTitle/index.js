import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Heading } from 'evergreen-ui';

import './SiteTitle.css';

// Declare a component that returns an HTML button with the given properties
const SiteTitle = ({ title }) => (
  <Pane padding={16}>
    <Heading size={900} style={{ color: 'white' }}>
      {title}
    </Heading>
    <Text style={{ color: 'white' }}>
      May your finger be quick and your spelling correct!
    </Text>
  </Pane>
);

// Description - appears in the storybook item
SiteTitle.description = `Site title!`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
SiteTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

// What properties the component should have when nothing is defined
SiteTitle.defaultProps = {};

export default SiteTitle;
