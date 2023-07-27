import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const tableHeight = 200;
const rowHeight = 48;
const visibleRows = Math.floor(tableHeight / rowHeight);

export const RecordExpensesTable = ({ recordExpenses, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: tableHeight, overflowY: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Reimbursed By</TableCell>
            <TableCell>Expense Category</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordExpenses.map((entry, index) => (
            <TableRow key={entry.record_expenses_id}>
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
              <TableCell>{entry.reimbursed_by ? entry.reimbursed_by.toString() : '-'}</TableCell>
              <TableCell>{entry.expense_category ? entry.expense_category.toString() : '-'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(entry.record_expenses_id)}>
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

export default RecordExpensesTable;
