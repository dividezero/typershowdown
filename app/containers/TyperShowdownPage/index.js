/*
 * TyperShowdownPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Pane, Dialog, Text, TextInput } from 'evergreen-ui';
import TimeCounterCard from '../../components/TimeCounterCard';
import WordListCard from '../../components/WordListCard';
import WordTyperCard from '../../components/WordTyperCard';
import ResultsDialog from '../../components/ResultsDialog';
import { getRandomWords } from '../../api/games';
import waitingImg from '../../images/girl-with-clock.gif';

const sock = new SockJS('http://10.13.16.201:7070/websocket');

export default function TyperShowdownPage() {
  const { channelId } = useParams();
  const [showUserNameDialog, setShowUserNameDialog] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState('');
  const [username2, setUsername2] = useState('');
  const [phase, setPhase] = useState('Get ready');
  const [gameOngoing, setGameOngoing] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordStartTIme, setWordStartTIme] = useState(0);
  const [timeLeft, setTImeLeft] = useState(0);
  const [countdownOnFinish, setCountdownOnFinish] = useState({
    onFinish: () => {},
  });

  useEffect(() => {
    sock.onopen = () => {
      console.log('open', channelId);
      // sock.send('test');
      sock.send(JSON.stringify({ action: 'joinChannel', channelId }));
    };

    sock.onclose = () => {
      console.log('close');
    };

    return () => sock.close();
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

  sock.onmessage = ({ data }) => {
    console.log('recieved', JSON.parse(data));
    const { action, words, word: submittedWord, player, time } = JSON.parse(
      data,
    );
    console.log('action', action);
    switch (action) {
      case 'COUNTDOWN':
        console.log('coundown start');
        if (!gameOngoing) {
          setPhase('Ready up!');
          setWordList(words.map(word => ({ word })));
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
      case 'TYPER_SUBMIT':
        setWordList(
          wordList.map(entry => {
            const { word } = entry;
            if (word === submittedWord) {
              console.log(username, player, username === player);
              if (username === player) {
                return {
                  ...entry,
                  typedTime1: time,
                };
              }
              return {
                ...entry,
                typedTime2: time,
              };
            }
            return entry;
          }),
        );
        break;
      case 'TYPER_PLAYER_PINGED':
        if (username !== player) {
          setUsername2(player);
          startGame();
        }
        break;
      case 'TYPER_PLAYER_JOINED':
        if (username !== player) {
          setUsername2(player);
          sendPlayerPing();
        }
        break;
      case 'TYPER_COMPLETE':
        setShowResults(true);
        setGameOngoing(false);

        sock.onclose = () => {
          console.log('close');
        };
        break;
      default:
        break;
    }
  };

  const getCurrentWord = () =>
    wordList[currentWordIndex] && wordList[currentWordIndex].word;

  const onTyping = value => {
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
    getRandomWords(20).then(response => {
      response.text().then(words => {
        console.log('words', words);
        sock.send(
          JSON.stringify({
            action: 'COUNTDOWN',
            words: JSON.parse(words),
            channelId,
          }),
        );
      });
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

  const getOpponentWordsCompleted = () =>
    wordList.filter(({ typedTime2 }) => !!typedTime2).length;

  const getOpponentTotalTime = () =>
    wordList
      .filter(({ typedTime2 }) => !!typedTime2)
      .reduce((acc, curr) => acc + curr, 0);

  const getPlayerTotalTime = () =>
    wordList
      .filter(({ typedTime }) => !!typedTime)
      .reduce((acc, curr) => acc + curr, 0);

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div>
      <Pane
        display="flex"
        flexDirection="column"
        jusifyItems="center"
        backgroundColor="#425A70"
        alignItems="center"
        height="100vh"
      >
        <Pane display="flex" flexDirection="row">
          <TimeCounterCard title={phase} countDownTIme={timeLeft} />
          {gameOngoing && (
            <WordListCard
              wordList={wordList}
              scrollToIndex={currentWordIndex}
              username1={username}
              username2={username2}
            />
          )}
        </Pane>
        {gameOngoing && (
          <WordTyperCard
            typingText={typingText}
            currentWord={getCurrentWord()}
            disabled={!gameOngoing}
            onChange={onTyping}
          />
        )}
      </Pane>

      {showUserNameDialog && (
        <Dialog
          title="Whats your name?"
          isShown
          hasClose={false}
          hasCancel={false}
          shouldCloseOnOverlayClick={false}
          width={400}
          onConfirm={() => {
            setShowUserNameDialog(false);
            sendPlayerJoin();
          }}
        >
          <TextInput
            placeholder="Please enter username..."
            width="100%"
            onChange={e => setUsername(e.target.value)}
          />
        </Dialog>
      )}

      {!showUserNameDialog && !username2 && (
        <Dialog
          title="Waiting on player 2"
          isShown
          hasClose={false}
          hasCancel={false}
          shouldCloseOnOverlayClick={false}
          hasFooter={false}
          width={400}
          margin={40}
        >
          <img src={waitingImg} style={{ width: '100%' }} alt="waiting" />
          <Text>Goddamn slowpoke. Warm up your fingers while you wait!</Text>
        </Dialog>
      )}

      {showResults && (
        <ResultsDialog
          isShown
          wordsCompleted={currentWordIndex}
          wordsCompleted2={getOpponentWordsCompleted()}
          timeTaken={getPlayerTotalTime()}
          timeTaken2={getOpponentTotalTime()}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}
