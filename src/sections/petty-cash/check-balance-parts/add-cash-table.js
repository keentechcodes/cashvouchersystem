import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton, // Step 1: Import IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Step 1: Import the DeleteIcon

import { format } from 'date-fns';

const tableHeight = 200; // Set the desired height for the table
const rowHeight = 48; // Set the height of each row in the table
const visibleRows = Math.floor(tableHeight / rowHeight); // Calculate the number of visible rows

export const AddCashTable = ({ cashEntries, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: tableHeight, overflowY: 'auto' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Replenished By</TableCell>
            <TableCell>Cash Category</TableCell>
            <TableCell>Delete</TableCell> {/* Step 2: Add the Delete column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {cashEntries.map((entry, index) => (
            <TableRow key={entry.add_cash_id}>
              <TableCell>
                {entry.date_of_entry
                  ? new Date(entry.date_of_entry).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '-'}
              </TableCell>
              <TableCell>₱ {entry.amount ? entry.amount.toString() : '-'}</TableCell>
              <TableCell>{entry.replenished_by ? entry.replenished_by.toString() : '-'}</TableCell>
              <TableCell>{entry.cash_category}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(entry.add_cash_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddCashTable;
