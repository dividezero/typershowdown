import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Pane, Table } from 'evergreen-ui';

import './WordListCard.css';

// Declare a component that returns an HTML button with the given properties
const WordListCard = ({ wordList }) => {
  const messagesEndRef = useRef(null);

  const getShade = (time1, time2) => {
    if (time1 > time2) return 'success';
    if (time1 < time2) return 'danger';
    return 'one';
  };

  const scroll = wordList.length ? { scrollToIndex: wordList.length - 1 } : {};
  return (
    <Pane>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Word</Table.TextHeaderCell>
          <Table.TextHeaderCell textAlign="right">
            Your Time
          </Table.TextHeaderCell>
          <Table.TextHeaderCell textAlign="right">
            Enemy Time
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={240} {...scroll}>
          {wordList &&
            wordList.map(({ word, typedTime1, typedTime2 }) => (
              <Table.Row
                key={word}
                isSelectable
                onSelect={() => {}}
                intent={getShade(typedTime1, typedTime2)}
              >
                <Table.TextCell>{word}</Table.TextCell>
                <Table.TextCell textAlign="right">{`${typedTime1}ms`}</Table.TextCell>
                <Table.TextCell textAlign="right">{`${typedTime2}ms`}</Table.TextCell>
              </Table.Row>
            ))}
        </Table.VirtualBody>
      </Table>
      <div ref={messagesEndRef} style={{ marginTop: 30 }} />
    </Pane>
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
};

// What properties the component should have when nothing is defined
WordListCard.defaultProps = {
  wordList: [],
};

export default WordListCard;
