<<<<<<< HEAD
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
=======
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
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
