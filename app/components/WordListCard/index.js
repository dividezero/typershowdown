import React from 'react';
import PropTypes from 'prop-types';
import { Table, Text, Heading } from 'evergreen-ui';

import './WordListCard.css';
import FormattedCard from '../FormattedCard';

// Declare a component that returns an HTML button with the given properties
const WordListCard = ({ wordList, scrollToIndex, username1, username2 }) => {
  const getShade = (time1, time2) => {
    if (time1 < time2) return 'success';
    if (time1 > time2) return 'danger';
    return 'none';
  };

  const scroll = wordList.length
    ? { scrollToIndex: scrollToIndex < 5 ? 0 : scrollToIndex - 5 }
    : {};
  return (
    <FormattedCard cellWidth={6} cellHeight={4}>
      <Table width="100%" height="100%">
        <Table.Head background="none">
          <Table.TextHeaderCell />
          <Table.TextHeaderCell textAlign="right">
            <Heading size={700}>{username1 || `Your Time`}</Heading>
          </Table.TextHeaderCell>
          <Table.TextHeaderCell textAlign="right">
            <Heading size={700}>{username2 || `Enemy Time`}</Heading>
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height="100%" {...scroll}>
          {wordList &&
            wordList.map(({ word, typedTime1, typedTime2 }) => (
              <Table.Row
                key={word}
                isSelectable
                onSelect={() => {}}
                intent={getShade(typedTime1, typedTime2)}
              >
                <Table.TextCell>
                  <Text size={500}>{word}</Text>
                </Table.TextCell>
                <Table.TextCell textAlign="right">
                  <Text size={500}>{typedTime1 && `${typedTime1} ms`}</Text>
                </Table.TextCell>
                <Table.TextCell textAlign="right">
                  <Text size={500}>{typedTime2 && `${typedTime2} ms`}</Text>
                </Table.TextCell>
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
      typedTime1: PropTypes.number,
      typedTime2: PropTypes.number,
    }),
  ),
  scrollToIndex: PropTypes.number,
  username1: PropTypes.string,
  username2: PropTypes.string,
};

// What properties the component should have when nothing is defined
WordListCard.defaultProps = {
  wordList: [],
  scrollToIndex: 0,
  username1: '',
  username2: '',
};

export default WordListCard;
