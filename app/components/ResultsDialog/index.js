import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, Dialog, Text } from 'evergreen-ui';
import winImg from '../../images/win.gif';
import loseImg from '../../images/lose.gif';

import './ResultsDialog.css';

const checkIfWin = (wordsCompleted, wordsCompleted2, timeTaken, timeTaken2) => {
  if (wordsCompleted > wordsCompleted2) {
    return true;
  }
  return wordsCompleted === wordsCompleted2 && timeTaken < timeTaken2;
};

// Declare a component that returns an HTML button with the given properties
const ResultsDialog = ({
  isShown,
  wordsCompleted,
  wordsCompleted2,
  timeTaken,
  timeTaken2,
  onRestart,
}) => {
  const isWin = checkIfWin(
    wordsCompleted,
    wordsCompleted2,
    timeTaken,
    timeTaken2,
  );
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
        {isWin ? (
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
        <Text marginTop={16}>
          Words completed: {wordsCompleted} vs {wordsCompleted2}
        </Text>
        <img
          src={isWin ? winImg : loseImg}
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
  wordsCompleted: PropTypes.number,
  wordsCompleted2: PropTypes.number,
  timeTaken: PropTypes.number,
  timeTaken2: PropTypes.number,
  onRestart: PropTypes.func,
};

// What properties the component should have when nothing is defined
ResultsDialog.defaultProps = {
  isShown: false,
  wordsCompleted: 0,
  wordsCompleted2: 0,
  timeTaken: 0,
  timeTaken2: 0,
  onRestart: () => {},
};

export default ResultsDialog;
