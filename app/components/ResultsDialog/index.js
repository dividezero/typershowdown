import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, Dialog, Table, Text } from 'evergreen-ui';
import winImg from '../../images/win.gif';
import loseImg from '../../images/lose.gif';

import './ResultsDialog.css';

// Declare a component that returns an HTML button with the given properties
const ResultsDialog = ({ isShown, wordList, username, onClose, onRestart }) => {
  const getPlayerResults = () =>
    wordList.reduce(
      (wordListResult, { times }) =>
        Object.keys(times).reduce(
          (result, name) => {
            if (result[name]) {
              return {
                ...result,
                [name]: result[name] + 1,
              };
            }
            return {
              ...result,
              [name]: 1,
            };
          },
          {
            ...wordListResult,
          },
        ),
      {},
    );

  const isTopPlayer = (playerResults, player) =>
    Math.max(...Object.values(playerResults)) === playerResults[player];

  const results = getPlayerResults();
  const winner = isTopPlayer(results, username);
  console.log('results', JSON.stringify(results));
  console.log('winner', winner);
  return (
    <Dialog
      isShown={isShown}
      hasClose={false}
      hasCancel={false}
      width={400}
      hasHeader={false}
      confirmLabel="Back to lobby"
      onConfirm={onRestart}
      onCloseComplete={onClose}
    >
      <Pane display="flex" flexDirection="column" padding={16}>
        {winner ? (
          <Fragment>
            <Heading size={900}>Congratulations!</Heading>
            <Heading>You won! You just earned bragging rights!</Heading>
          </Fragment>
        ) : (
          <Fragment>
            <Heading size={900}>Oh man! Too slow!</Heading>
            <Heading>You lost! Better luck next time..</Heading>
          </Fragment>
        )}
        <img
          src={winner ? winImg : loseImg}
          alt="win"
          width="100%"
          style={{ marginTop: 16, marginBottom: 0 }}
        />
        <Table.Body
          style={{
            paddingTop: 16,
          }}
        >
          <Table.Head>
            <Table.TextCell>Player</Table.TextCell>
            <Table.TextCell
              style={{
                textAlign: 'center',
              }}
            >
              Word Count
            </Table.TextCell>
          </Table.Head>
          <Table.Body>
            {Object.keys(results).map(name => (
              <Table.Row
                intent={isTopPlayer(results, name) ? 'success' : 'danger'}
              >
                <Table.TextCell>
                  <Text
                    style={{
                      fontWeight: name === username ? 'bold' : 'normal',
                    }}
                  >
                    {name}
                  </Text>
                </Table.TextCell>
                <Table.TextCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: name === username ? 'bold' : 'normal',
                    }}
                  >
                    {results[name]}
                  </Text>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Body>
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
  onClose: PropTypes.func,
  onRestart: PropTypes.func,
};

// What properties the component should have when nothing is defined
ResultsDialog.defaultProps = {
  isShown: false,
  wordList: [],
  onClose: () => {},
  onRestart: () => {},
};

export default ResultsDialog;
