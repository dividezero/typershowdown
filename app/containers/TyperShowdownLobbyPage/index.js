/*
 * TyperShowdownLobbyPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, IconButton, Pane } from 'evergreen-ui';
import SockJS from 'sockjs-client';
import GameListCard from '../../components/GameListCard';
import TyperShowdownPage from '../TyperShowdownPage/Loadable';

import config, { apiUrl } from '../../config.json';
import { getGameSessions } from '../../api/games';
import SiteTitle from '../../components/SiteTitle';
import ProfileCard from '../../components/ProfileCard';
import SocketChat from '../../components/SocketChat';
import UsernameDialog from '../../components/UsernameDialog';
import CreateGameDialog from '../../components/CreateGameDialog';
import chatUtil from '../../utils/chatMessages';

const gameName = 'TYPER_SHOWDOWN';
const setupStatus = 'GAME_SETUP';
const chatChannel = 'TYPER_SHOWDOWN_CHAT_CHANNEL';
const sock = new SockJS(`${apiUrl}/websocket`);

export default function TyperShowdownLobbyPage() {
  const [gameList, setGameList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [host, setHost] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    status: '',
    profileUrl: '',
  });
  const [showCreateGameDialog, setShowCreateGameDialog] = useState(false);

  const refreshSessions = () => {
    getGameSessions(gameName, setupStatus).then(response => {
      response.text().then(body => {
        const { channels } = JSON.parse(body);
        setGameList(channels);
      });
    });
  };

  const createGame = maxPlayers => {
    if (profile.username) {
      setShowCreateGameDialog(false);
      const tempChannelId = `${gameName}_${profile.username}`;
      sock.send(
        JSON.stringify({
          action: 'CHANNEL_CREATE',
          channelId: tempChannelId,
          channelOpts: {
            game: gameName,
            maxPlayers,
            status: setupStatus,
          },
          username: profile.username,
        }),
      );
      setHost(true);
      setChannelId(tempChannelId);
    }
  };

  const onJoinGame = selectedChannel => {
    setChannelId(selectedChannel);
    sock.send(
      JSON.stringify({
        action: 'CHANNEL_JOIN',
        channelId: selectedChannel,
        username: profile.username,
      }),
    );
  };

  const onQuitGame = () => {
    sock.send(
      JSON.stringify({
        action: 'CHANNEL_LEAVE',
        channelId,
      }),
    );
    setChannelId('');
  };

  useEffect(() => {
    refreshSessions();
  }, []);

  sock.onmessage = e => {
    console.log('recieved', JSON.parse(e.data));
    const data = JSON.parse(e.data);
    const { action } = data;

    switch (action) {
      case 'CHAT_MESSAGE':
        console.log('CHAT_MESSAGE', data);
        setMessageList([...messageList, data]);
        break;
      default:
        break;
    }
  };

  sock.onopen = () => {
    console.log('open', channelId);
  };

  sock.onclose = () => {
    console.log('close');
  };

  return (
    <Pane display="flex" justifyContent="center" paddingTop={32}>
      {profile.username && channelId ? (
        <TyperShowdownPage
          channelId={channelId}
          username={profile.username}
          sock={sock}
          host={host}
          onQuit={onQuitGame}
        />
      ) : (
        <Pane style={{ width: 1080 }}>
          <Pane paddingTop={8} paddingLeft={6} paddingRight={8} display="flex">
            <Pane width="60%" padding={8}>
              <SiteTitle title="Typer Showdown!" />
            </Pane>
            <Pane width="40%">
              <ProfileCard
                name={profile.username}
                status={profile.status}
                profileUrl={profile.profileUrl}
              />
            </Pane>
          </Pane>
          <Pane
            paddingBottom={8}
            paddingLeft={6}
            paddingRight={8}
            display="flex"
          >
            <Pane paddingTop={8} paddingBottom={8} paddingLeft={8} width="60%">
              <Pane display="flex" paddingLeft={8} paddingRight={8}>
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
                onSelect={onJoinGame}
                onRefresh={refreshSessions}
              />
            </Pane>
            <Pane width="40%">
              <SocketChat
                messageHistory={messageList}
                onSubmit={newMessage => {
                  sock.send(
                    JSON.stringify(
                      chatUtil.createChatMessage(
                        newMessage,
                        profile.username,
                        chatChannel,
                      ),
                    ),
                  );
                }}
              />
            </Pane>
          </Pane>
        </Pane>
      )}
      <CreateGameDialog
        isShown={showCreateGameDialog}
        maxPlayersOption={config.maxPlayers}
        onConfirm={createGame}
        onCancel={() => setShowCreateGameDialog(false)}
      />
      {!profile.username && (
        <UsernameDialog
          isShown
          onConfirm={(username, status, profileUrl) => {
            setProfile({
              username,
              status,
              profileUrl,
            });
            sock.send(
              JSON.stringify({
                action: 'CHANNEL_JOIN',
                channelId: chatChannel,
                username,
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
