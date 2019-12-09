import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'evergreen-ui';

import './FormattedCard.css';

// Declare a component that returns an HTML button with the given properties
const FormattedCard = topProps => {
  const props = { ...topProps };
  const { children } = topProps;
  delete props.children;
  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin={16}
      padding={24}
      elevation={2}
      {...props}
    >
      {children}
    </Card>
  );
};

// Description - appears in the storybook item
FormattedCard.description = `The arena where the user types`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
FormattedCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

// What properties the component should have when nothing is defined
FormattedCard.defaultProps = {
  children: [],
};

export default FormattedCard;
