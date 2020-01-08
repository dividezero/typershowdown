/*
 * TyperShowdownLobbyPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Button, IconButton, Pane } from 'evergreen-ui';
import SockJS from 'sockjs-client';
import GameListCard from '../../components/GameListCard';
import TyperShowdownPage from '../TyperShowdownPage/Loadable';

import config, { apiUrl } from '../../config.json';
import { getGameSessions } from '../../api/games';
import UsernameDialog from '../../components/UsernameDialog';
import theme from '../../theme';
import CreateGameDialog from '../../components/CreateGameDialog';

const gameName = 'TYPER_SHOWDOWN';
const setupStatus = 'GAME_SETUP';
const sock = new SockJS(`${apiUrl}/websocket`);

export default function TyperShowdownLobbyPage() {
  const [gameList, setGameList] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [host, setHost] = useState(false);
  const [username, setUsername] = useState('');
  const [showCreateGameDialog, setShowCreateGameDialog] = useState(false);

  const refreshSessions = () => {
    getGameSessions(gameName, setupStatus).then(response => {
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
    <Pane>
      {username && channelId ? (
        <TyperShowdownPage
          channelId={channelId}
          username={username}
          sock={sock}
          host={host}
        />
      ) : (
        <Pane padding={16}>
          <Pane display="flex" width="100%" padding={8}>
            <Button
              appearance="primary"
              onClick={() => {
                setShowCreateGameDialog(true);
              }}
            >
              Create
            </Button>
            <span style={{ flexGrow: 1 }} />
            <IconButton icon="refresh" onClick={refreshSessions} />
          </Pane>
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
        maxPlayersOption={config.maxPlayers}
        onConfirm={(tempUsername, maxPlayers) => {
          if (`${tempUsername}`.trim()) {
            setShowCreateGameDialog(false);
            const tempChannelId = `TYPER_SHOWDOWN_${tempUsername}`;
            sock.send(
              JSON.stringify({
                action: 'CHANNEL_CREATE',
                channelId: tempChannelId,
                channelOpts: {
                  game: 'TYPER_SHOWDOWN',
                  maxPlayers,
                  status: setupStatus,
                },
                username: tempUsername,
              }),
            );
            setHost(true);
            setUsername(tempUsername);
            setChannelId(tempChannelId);
          }
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
TyperShowdownLobbyPage.propTypes = {};

// What properties the component should have when nothing is defined
TyperShowdownLobbyPage.defaultProps = {};
