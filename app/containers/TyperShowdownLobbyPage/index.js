/*
 * TyperShowdownLobbyPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Pane } from 'evergreen-ui';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import GameListCard from '../../components/GameListCard';
import TyperShowdownPage from '../TyperShowdownPage/Loadable';

import { getGameSessions } from '../../api/games';
import UsernameDialog from '../../components/UsernameDialog';
import theme from '../../theme';
import CreateGameDialog from '../../components/CreateGameDialog';

const gameName = 'TYPER_SHOWDOWN';

const sock = new SockJS('http://10.13.16.201:7070/websocket');

export default function TyperShowdownLobbyPage() {
  const [gameList, setGameList] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [host, setHost] = useState(false);
  const [username, setUsername] = useState('');
  const [showCreateGameDialog, setShowCreateGameDialog] = useState(false);

  const refreshSessions = () => {
    getGameSessions(gameName).then(response => {
      response.text().then(body => {
        const { channels } = JSON.parse(body);
        setGameList(channels);
      });
    });
  };

  useEffect(() => {
    refreshSessions();
  }, []);

  sock.onopen = () => {
    console.log('open', channelId);
  };

  sock.onclose = () => {
    console.log('close');
  };

  return (
    <Pane backgroundColor={theme.backgroundColor} height="100vh">
      {username && channelId ? (
        <TyperShowdownPage
          channelId={channelId}
          username={username}
          sock={sock}
          host={host}
        />
      ) : (
        <Pane padding={20}>
          <GameListCard
            gameList={gameList}
            onCreate={() => {
              setShowCreateGameDialog(true);
            }}
            onSelect={setChannelId}
            onRefresh={refreshSessions}
          />
        </Pane>
      )}
      <CreateGameDialog
        isShown={showCreateGameDialog}
        maxPlayersOption={4}
        onConfirm={(tempUsername, maxPlayers) => {
          setShowCreateGameDialog(false);
          const tempChannelId = `TYPER_SHOWDOWN_${tempUsername}`;
          sock.send(
            JSON.stringify({
              action: 'CHANNEL_CREATE',
              channelId: tempChannelId,
              channelOpts: {
                game: 'TYPER_SHOWDOWN',
                maxPlayers,
              },
              username: tempUsername,
            }),
          );
          setHost(true);
          setUsername(tempUsername);
          setChannelId(tempChannelId);
        }}
        onCancel={() => setShowCreateGameDialog(false)}
      />
      {!username && channelId && (
        <UsernameDialog
          isShown
          onConfirm={uname => {
            setUsername(uname);
            sock.send(
              JSON.stringify({
                action: 'CHANNEL_JOIN',
                channelId,
                username: uname,
              }),
            );
          }}
        />
      )}
    </Pane>
  );
}

// Description - appears in the storybook item
TyperShowdownLobbyPage.description = `Shows list of games`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
TyperShowdownLobbyPage.propTypes = {
  onGameSelect: PropTypes.func,
};

// What properties the component should have when nothing is defined
TyperShowdownLobbyPage.defaultProps = {
  onGameSelect: () => {},
};
