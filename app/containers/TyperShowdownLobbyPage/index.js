/*
 * TyperShowdownLobbyPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Pane } from 'evergreen-ui';
import GameListCard from '../../components/GameListCard';

import { getGameSessions } from '../../api/games';

const gameName = 'TyperShowdown';

export default function TyperShowdownLobbyPage() {
  const [gameList, setGameList] = useState([]);

  console.log('render');
  const refreshSessions = () => {
    getGameSessions(gameName).then(response => {
      response.text().then(body => {
        const { channels } = JSON.parse(body);
        console.log('channels', channels);
        setGameList(channels);
      });
    });
  };

  useEffect(() => {
    refreshSessions();
  }, []);

  return (
    <Pane padding={20}>
      <GameListCard
        gameList={gameList}
        onCreate={() => {}}
        onSelect={() => {}}
        onRefresh={refreshSessions}
      />
    </Pane>
  );
}
