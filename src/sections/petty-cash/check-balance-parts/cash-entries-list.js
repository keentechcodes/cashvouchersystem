import React from 'react';
import PropTypes from 'prop-types';

const CashEntriesList = ({ cashEntries }) => {
  return (
    <ul>
      {cashEntries.map((entry) => (
        <li key={entry.category}>
          <strong>{entry.category}:</strong> ₱ {entry.totalCash}
        </li>
      ))}
    </ul>
  );
};

CashEntriesList.propTypes = {
  cashEntries: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      totalCash: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CashEntriesList;
