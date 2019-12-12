import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, Dialog } from 'evergreen-ui';
import winImg from '../../images/win.gif';
import loseImg from '../../images/lose.gif';

import './ResultsDialog.css';

// Declare a component that returns an HTML button with the given properties
const ResultsDialog = ({ isShown, wordList, username, onRestart }) => {
  const getPlayerResults = () =>
    wordList.reduce(
      (wordListResult, { times }) =>
        Object.keys(times).reduce((perPlayerResult, player) => {
          const wordCount =
            (wordListResult[player] && wordListResult[player].wordCount) || 0;
          return {
            ...wordListResult,
            [player]: {
              wordCount: wordCount + 1,
              time: perPlayerResult[player] + times[player],
            },
          };
        }, wordListResult),
      {},
    );

  const isWin = playerResults => {
    let topPlayer = { wordCount: 0 };

    const playerNames = Object.keys(playerResults);
    // eslint-disable-next-line no-restricted-syntax
    for (const playerName of playerNames) {
      const player = playerResults[playerName];
      if (player.wordCount > topPlayer.wordCount) {
        topPlayer = player;
      } else if (player.wordCount === topPlayer.wordCount) {
        if (!topPlayer.time || player.time < topPlayer.time) {
          topPlayer = player;
        }
      }
    }
    return username === topPlayer.
  };

  const results = getPlayerResults();
  console.log('results', results);
  return (
    <Dialog
      isShown={isShown}
      hasClose={false}
      hasCancel={false}
      shouldCloseOnOverlayClick={false}
      width={400}
      hasHeader={false}
      confirmLabel="Restart"
      onConfirm={onRestart}
    >
      <Pane display="flex" flexDirection="column" padding={16}>
        {isWin(results) ? (
          <Fragment>
            <Heading size={900}>Congratulations! </Heading>
            <Heading>You won! You just earned bragging rights!</Heading>
          </Fragment>
        ) : (
          <Fragment>
            <Heading size={900}>Oh man! Too slow!</Heading>
            <Heading>You lost! Better luck next time..</Heading>
          </Fragment>
        )}
        <img
          src={isWin(results) ? winImg : loseImg}
          alt="win"
          width="100%"
          style={{ marginTop: 16, marginBottom: 0 }}
        />
      </Pane>
    </Dialog>
  );
};

// Description - appears in the storybook item
ResultsDialog.description = `Shows whether the player won or lost`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
ResultsDialog.propTypes = {
  isShown: PropTypes.bool,
  wordList: PropTypes.arrayOf(
    PropTypes.shape({ word: PropTypes.string, times: PropTypes.shape({}) }),
  ),
  username: PropTypes.string.isRequired,
  onRestart: PropTypes.func,
};

// What properties the component should have when nothing is defined
ResultsDialog.defaultProps = {
  isShown: false,
  wordList: [],
  onRestart: () => {},
};

export default ResultsDialog;
