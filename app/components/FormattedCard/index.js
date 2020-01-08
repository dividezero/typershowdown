import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'evergreen-ui';
import { getCardWidth } from '../../theme/layout';

import './FormattedCard.css';

// Declare a component that returns an HTML button with the given properties
const FormattedCard = topProps => {
  const props = { ...topProps };
  const { children, cellWidth, cellHeight } = topProps;
  delete props.children;
  delete props.cellWidth;
  delete props.cellHeight;
  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin={8}
      padding={16}
      elevation={2}
      width={getCardWidth(cellWidth)}
      height={getCardWidth(cellHeight)}
      backgroundColor="white"
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
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  justifyItems: PropTypes.string,
};

// What properties the component should have when nothing is defined
FormattedCard.defaultProps = {
  children: [],
  cellWidth: 0,
  cellHeight: 0,
  justifyItems: undefined,
};

export default FormattedCard;
