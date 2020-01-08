import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Pane, TextInputField } from 'evergreen-ui';

import ProfileCard from '../ProfileCard';
import './UsernameDialog.css';

// Declare a component that returns an HTML button with the given properties
const UsernameDialog = ({
  isShown,
  showPreview,
  hasStatus,
  hasProfileUrl,
  onConfirm,
}) => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  return (
    <Dialog
      title="User Profile"
      isShown={isShown}
      hasClose={false}
      hasCancel={false}
      shouldCloseOnOverlayClick={false}
      width={400}
      onConfirm={() => {
        const trimmed = username.trim();
        if (trimmed) {
          onConfirm(trimmed, status.trim(), profileUrl.trim());
        }
      }}
    >
      {showPreview && (
        <Pane marginBottom={32}>
          <ProfileCard
            name={username}
            profileUrl={profileUrl}
            status={status}
          />
        </Pane>
      )}

      <TextInputField
        label="Username"
        required
        description="What would you like your username to be?"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {hasStatus && (
        <TextInputField
          label="Status"
          description="Enter a status here. Or not. Do you wanna say you're da champ? Go ahead. Just this once."
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
      )}
      {hasProfileUrl && (
        <TextInputField
          label="Profile URL"
          description="Enter a profile URL. Make sure its a valid url."
          value={profileUrl}
          onChange={e => setProfileUrl(e.target.value)}
        />
      )}
    </Dialog>
  );
};

// Description - appears in the storybook item
UsernameDialog.description = `Shows whether the player won or lost`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
UsernameDialog.propTypes = {
  isShown: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool,
  hasStatus: PropTypes.bool,
  hasProfileUrl: PropTypes.bool,
  onConfirm: PropTypes.func,
};

// What properties the component should have when nothing is defined
UsernameDialog.defaultProps = {
  showPreview: true,
  hasStatus: true,
  hasProfileUrl: true,
  onConfirm: () => {},
};

export default UsernameDialog;
