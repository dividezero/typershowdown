/*
 * TyperShowdownPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Heading, Pane } from 'evergreen-ui';
import TimeCounterCard from '../../components/TimeCounterCard';
import WordListCard from '../../components/WordListCard';
import WordTyperCard from '../../components/WordTyperCard';
import ResultsDialog from '../../components/ResultsDialog';
import ReadyButtonCard from '../../components/ReadyButtonCard';
import { getRandomWords } from '../../api/games';
// import waitingImg from '../../images/girl-with-clock.gif';
import config from '../../config.json';
import theme from '../../theme';
import OpponentCard from '../../components/OpponentCard';
import { getCardWidth } from '../../theme/layout';

const randomWordCount = 20;

export default function TyperShowdownPage({ sock, channelId, username, host }) {
  const [showResults, setShowResults] = useState(false);
  const [phase, setPhase] = useState('Get ready');
  const [showReadyButton, setShowReadyButton] = useState(true);
  const [gameOngoing, setGameOngoing] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordStartTIme, setWordStartTIme] = useState(0);
  const [timeLeft, setTImeLeft] = useState(0);
  const [players, setPlayers] = useState({});
  const [countdownOnFinish, setCountdownOnFinish] = useState({
    onFinish: () => {},
  });

  // eslint-disable-next-line no-param-reassign
  sock.onmessage = ({ data }) => {
    console.log('recieved', JSON.parse(data));
    const {
      action,
      words,
      word: submittedWord,
      player,
      newPlayers,
      time,
      readyState,
      message,
      typing,
      username: msgUsername,
    } = JSON.parse(data);
    console.log('action', action);
    switch (action) {
      case 'TYPER_COUNTDOWN':
        console.log('coundown start');
        if (!gameOngoing) {
          setPhase('Ready up!');
          setShowReadyButton(false);
          setWordList(words.map(word => ({ word, times: {} })));
          setCountdownTimer(5, () => {
            setPhase('GO!');
            setGameOngoing(true);
            setWordStartTIme(new Date().getTime());
            setCountdownTimer(30, () => {
              sock.send(
                JSON.stringify({ action: 'TYPER_COMPLETE', channelId }),
              );
            });
          });
        }
        break;
      case 'TYPER_HOST_UPDATE':
        setPlayers(newPlayers);
        break;
      case 'TYPER_TYPE':
        // eslint-disable-next-line no-case-declarations
        const playersUpdate = { ...players };
        playersUpdate[player].typing = typing;
        setPlayers(playersUpdate);
        break;
      case 'TYPER_SUBMIT':
        setWordList(
          wordList.map(entry => {
            const { word, times } = entry;
            if (word === submittedWord) {
              return {
                ...entry,
                times: {
                  ...times,
                  [player]: time,
                },
              };
            }
            return entry;
          }),
        );
        if (host) {
          const hostUpdatePlayers = {
            ...players,
          };
          hostUpdatePlayers[player].progress =
            players[player].progress + 100 / randomWordCount;
          console.log(
            'hostUpdatePlayers[player].progress',
            hostUpdatePlayers[player].progress,
          );
          sendHostUpdate(hostUpdatePlayers);
        }
        break;
      case 'TYPER_PLAYER_PINGED':
        if (username !== player) {
          // startGame();
        }
        break;
      case 'TYPER_PLAYER_JOINED':
        if (host) {
          if (player && !players[player]) {
            console.log('players', players);
            const hostUpdatePlayers = {
              ...players,
              [player]: {
                username: player,
                typing: '',
                progress: 0,
                readyState: false,
              },
            };
            sendHostUpdate(hostUpdatePlayers);
          }
        }
        break;
      case 'USER_DISCONNECTED':
        if (host) {
          const hostUpdatePlayers = { ...players };
          delete hostUpdatePlayers[msgUsername];
          sendHostUpdate(hostUpdatePlayers);
        }
        break;
      case 'TYPER_PLAYER_READY':
        if (host) {
          const hostUpdatePlayers = {
            ...players,
          };
          hostUpdatePlayers[player].readyState = readyState;
          sendHostUpdate(hostUpdatePlayers);
          if (allPlayersAreReady()) {
            startGame();
          }
        }
        break;
      case 'TYPER_COMPLETE':
        setShowResults(true);
        setGameOngoing(false);

        sock.close();
        // eslint-disable-next-line no-param-reassign
        sock.onclose = () => {
          console.log('close');
        };
        break;
      case 'ERROR':
        alert(`error ${message}`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      sendPlayerJoin();
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (timeLeft > 0) {
        setTImeLeft(timeLeft - 1);
      } else {
        const { onFinish } = countdownOnFinish;
        onFinish();
      }
    }, 1000);
  }, [timeLeft]);

  const setCountdownTimer = (seconds, onFinish) => {
    setTImeLeft(seconds);
    setCountdownOnFinish({ onFinish });
  };

  const getCurrentWord = () =>
    wordList[currentWordIndex] && wordList[currentWordIndex].word;

  const onTyping = value => {
    if (players.length <= config.showPlayerTypingMaxPlayers) {
      sock.send(
        JSON.stringify({
          action: 'TYPER_TYPE',
          player: username,
          typing: value,
          channelId,
        }),
      );
    }
    if (value === getCurrentWord()) {
      setTypingText('');
      setCurrentWordIndex(currentWordIndex + 1);
      sock.send(
        JSON.stringify({
          action: 'TYPER_SUBMIT',
          player: username,
          word: value,
          time: new Date().getTime() - wordStartTIme,
          channelId,
        }),
      );
      setWordStartTIme(new Date().getTime());
    } else {
      setTypingText(value);
    }
  };

  const startGame = () => {
    setShowResults(false);
    getRandomWords(randomWordCount)
      .then(response => {
        response.text().then(words => {
          console.log('words', words);
          sock.send(
            JSON.stringify({
              action: 'TYPER_COUNTDOWN',
              words: JSON.parse(words),
              channelId,
            }),
          );
        });
      })
      .catch(e => {
        alert('word query issue. Please update API key');
        console.error(e);
      });
  };

  const sendPlayerJoin = () => {
    if (username) {
      sock.send(
        JSON.stringify({
          action: 'TYPER_PLAYER_JOINED',
          player: username,
          channelId,
        }),
      );
    }
  };

  /*
  const sendPlayerPing = () => {
    if (username) {
      sock.send(
        JSON.stringify({
          action: 'TYPER_PLAYER_PINGED',
          player: username,
          channelId,
        }),
      );
    }
  };
   */

  const sendPlayerReadyState = readyState => {
    sock.send(
      JSON.stringify({
        action: 'TYPER_PLAYER_READY',
        player: username,
        readyState,
        channelId,
      }),
    );
  };

  const sendHostUpdate = newPlayers => {
    if (host) {
      sock.send(
        JSON.stringify({
          action: 'TYPER_HOST_UPDATE',
          player: username,
          newPlayers,
          channelId,
        }),
      );
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  const allPlayersAreReady = () => {
    const playerNames = Object.keys(players);
    return (
      playerNames.length > 1 &&
      playerNames.filter(name => players[name].readyState).length ===
        playerNames.length
    );
  };

  return (
    <div>
      <Pane
        display="flex"
        flexDirection="column"
        jusifyItems="center"
        backgroundColor={theme.backgroundColor}
        alignItems="center"
        height="100vh"
      >
        <Pane display="flex" flexDirection="row">
          <Pane display="flex" flexDirection="column">
            <TimeCounterCard title={phase} countDownTIme={timeLeft} />
            {Object.keys(players).map(uname => {
              const { typing, progress, readyState } = players[uname];
              return (
                <OpponentCard
                  key={uname}
                  name={uname}
                  typing={typing}
                  progress={progress}
                  readyState={readyState}
                  gameOngoing={gameOngoing}
                />
              );
            })}
          </Pane>
          <Pane display="flex" flexDirection="column">
            <WordListCard
              wordList={wordList}
              scrollToIndex={currentWordIndex}
              players={Object.keys(players)}
            />

            {players[username] && showReadyButton && (
              <ReadyButtonCard
                ready={players[username].readyState}
                onClick={() => {
                  const { readyState } = players[username];
                  console.log('readyState', readyState);
                  sendPlayerReadyState(!readyState);
                }}
              />
            )}
            {gameOngoing && (
              <WordTyperCard
                typingText={typingText}
                currentWord={getCurrentWord()}
                disabled={!gameOngoing}
                onChange={onTyping}
              />
            )}
          </Pane>
        </Pane>
      </Pane>

      {showResults && (
        <ResultsDialog
          isShown
          wordList={wordList}
          username={username}
          onRestart={restartGame}
        />
      )}
      {showResults && (
        <Button
          appearance="primary"
          height={getCardWidth(1)}
          width={getCardWidth(6)}
          marginLeft={16}
          onClick={restartGame}
        >
          <Heading size={900} color="white" textAlign="center" width="100%">
            Back to Lobby
          </Heading>
        </Button>
      )}
    </div>
  );
}

// Description - appears in the storybook item
TyperShowdownPage.description = `Typer showdown time!`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
TyperShowdownPage.propTypes = {
  username: PropTypes.string.isRequired,
  sock: PropTypes.shape({}).isRequired,
  channelId: PropTypes.string.isRequired,
  host: PropTypes.bool.isRequired,
};

// What properties the component should have when nothing is defined
TyperShowdownPage.defaultProps = {};
