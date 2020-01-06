import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Pane, Table } from 'evergreen-ui';

import './GameListCard.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const GameListCard = ({ gameList, onSelect, onCreate, onRefresh }) => {
  const messagesEndRef = useRef(null);

  const getShade = numPlayers => {
    if (numPlayers >= 2) return 'danger';
    return 'none';
  };

  console.log('gameList', gameList);
  const scroll = gameList.length ? { scrollToIndex: gameList.length - 1 } : {};
  return (
    <FormattedCard>
      <Pane display="flex" width="100%">
        <Button appearance="primary" marginBottom={16} onClick={onCreate}>
          Create
        </Button>
        <span style={{ flexGrow: 1 }} />
        <IconButton marginBottom={16} icon="refresh" onClick={onRefresh} />
      </Pane>
      <Table width="100%">
        <Table.Head>
          <Table.TextHeaderCell>Host</Table.TextHeaderCell>
          <Table.TextHeaderCell textAlign="right">
            No of Players
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={240} {...scroll}>
          {gameList &&
            gameList.map(({ channelId, players, numPlayers }) => (
              <Table.Row
                key={channelId}
                isSelectable
                onSelect={onSelect}
                intent={getShade(numPlayers)}
              >
                <Table.TextCell>{channelId}</Table.TextCell>
                <Table.TextCell>{players}</Table.TextCell>
                <Table.TextCell textAlign="right">{`${numPlayers}/2`}</Table.TextCell>
              </Table.Row>
            ))}
        </Table.VirtualBody>
      </Table>
      <div ref={messagesEndRef} style={{ marginTop: 30 }} />
    </FormattedCard>
  );
};

// Description - appears in the storybook item
GameListCard.description = `A list of ongoing games`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
GameListCard.propTypes = {
  gameList: PropTypes.arrayOf(
    PropTypes.shape({
      channelId: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.string),
      numPlayers: PropTypes.number,
    }),
  ),
  onCreate: PropTypes.func,
  onSelect: PropTypes.func,
  onRefresh: PropTypes.func,
};

// What properties the component should have when nothing is defined
GameListCard.defaultProps = {
  gameList: [],
  onCreate: () => {},
  onSelect: () => {},
  onRefresh: () => {},
};

export default GameListCard;