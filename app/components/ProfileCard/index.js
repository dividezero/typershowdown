import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Pane, Heading, Tooltip, Text } from 'evergreen-ui';

import './ProfileCard.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const ProfileCard = ({ name, status, profileUrl }) => (
  <FormattedCard cellHeight={1} display="flex" flexDirection="row">
    <Pane marginRight={16}>
      <Tooltip content={name}>
        <Avatar isSolid name={name} size={60} src={profileUrl} />
      </Tooltip>
    </Pane>

    <Pane
      marginLeft={8}
      display="flex"
      flexDirection="column"
      width="100%"
      flexGrow={2}
    >
      <Heading size={800} marginBottom={8}>
        {name}
      </Heading>
      <Text>{status}</Text>
    </Pane>
  </FormattedCard>
);

// Description - appears in the storybook item
ProfileCard.description = `Shows the user profile`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  profileUrl: PropTypes.string,
};

// What properties the component should have when nothing is defined
ProfileCard.defaultProps = {
  status: '',
  profileUrl: undefined,
};

export default ProfileCard;
