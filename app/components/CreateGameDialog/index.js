import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Text, TextInputField, SegmentedControl } from 'evergreen-ui';

import './CreateGameDialog.css';

// Declare a component that returns an HTML button with the given properties
const CreateGameDialog = ({
  isShown,
  maxPlayersOption,
  onConfirm,
  onCancel,
}) => {
  const [username, setUsername] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(maxPlayersOption);

  const getMaxPlayersList = maxNum => {
    const list = [];
    for (let i = 2; i <= maxNum; i += 1) {
      list.push({ label: `${i}`, value: i });
    }
    return list;
  };

  return (
    <Dialog
      title="Create a game"
      isShown={isShown}
      shouldCloseOnOverlayClick={false}
      width={400}
      onConfirm={() => {
        onConfirm(username, maxPlayers);
      }}
      onCancel={onCancel}
    >
      <TextInputField
        label="Host Username"
        required
        description="What would you like your username to be?"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <div>
        <Text>Player Max</Text>
      </div>
      <div style={{ paddingBottom: 8 }}>
        <Text fontWeight={400} color="#66788A">
          How many maximum number of players?
        </Text>
      </div>
      <SegmentedControl
        name="switch"
        options={getMaxPlayersList(maxPlayersOption)}
        value={maxPlayers}
        onChange={setMaxPlayers}
      />
    </Dialog>
  );
};

// Description - appears in the storybook item
CreateGameDialog.description = `Shows whether the player won or lost`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
CreateGameDialog.propTypes = {
  isShown: PropTypes.bool.isRequired,
  maxPlayersOption: PropTypes.number.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

// What properties the component should have when nothing is defined
CreateGameDialog.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

export default CreateGameDialog;
