import React from 'react';
import PropTypes from 'prop-types';
import { Table, Text, Heading } from 'evergreen-ui';

import './WordListCard.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const WordListCard = ({ wordList, scrollToIndex, players }) => {
  const scroll = wordList.length
    ? { scrollToIndex: scrollToIndex < 5 ? 0 : scrollToIndex - 5 }
    : {};
  return (
    <FormattedCard cellWidth={6} cellHeight={4}>
      <Table width="100%" height="100%" paddingBottom={16}>
        <Table.Head background="none">
          <Table.TextHeaderCell />
          {players.map(name => (
            <Table.TextHeaderCell key={name} textAlign="center">
              <Heading size={600}>{name}</Heading>
            </Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody height="100%" {...scroll}>
          {wordList.map(({ word, times }) => (
            <Table.Row
              key={word}
              isSelectable
              onSelect={() => {}}
              // intent={getShade(typedTime1, typedTime2)}
            >
              <Table.TextCell>
                <Text size={500}>{word}</Text>
              </Table.TextCell>
              {players.map(username => (
                <Table.TextCell key={`${word}_${username}`} textAlign="right">
                  <Text size={500}>
                    {times[username] && `${times[username]} ms`}
                  </Text>
                </Table.TextCell>
              ))}
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </FormattedCard>
  );
};

// Description - appears in the storybook item
WordListCard.description = `Chat with the group selected`;

// This allows for the definition of rules that each prop type has to follow in order to be used properly
WordListCard.propTypes = {
  wordList: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      times: PropTypes.objectOf(PropTypes.number),
    }),
  ),
  scrollToIndex: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.string),
};

// What properties the component should have when nothing is defined
WordListCard.defaultProps = {
  wordList: [],
  scrollToIndex: 0,
  players: [],
};

export default WordListCard;
