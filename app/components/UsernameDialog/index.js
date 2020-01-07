import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';

import './UsernameDialog.css';

// Declare a component that returns an HTML button with the given properties
const UsernameDialog = ({ isShown, onConfirm }) => {
  const [username, setUsername] = useState('');

  return (
    <Dialog
      title="Join game"
      isShown={isShown}
      hasClose={false}
      hasCancel={false}
      shouldCloseOnOverlayClick={false}
      width={400}
      onConfirm={() => {
        if (username) {
          onConfirm(username);
        }
      }}
    >
      <TextInputField
        label="Username"
        required
        description="What would you like your username to be?"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
    </Dialog>
  );
};

// Description - appears in the storybook item
UsernameDialog.description = `Shows whether the player won or lost`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
UsernameDialog.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
};

// What properties the component should have when nothing is defined
UsernameDialog.defaultProps = {
  onConfirm: () => {},
};

export default UsernameDialog;
