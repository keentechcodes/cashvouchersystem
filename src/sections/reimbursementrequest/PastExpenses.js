import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const PastExpenses = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/reimbursements')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {data.map((reimbursement, reimbursementIndex) => (
        <Card key={reimbursementIndex} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant='body2' gutterBottom>
              {`Date Inputted: ${new Date(reimbursement.today).toLocaleDateString()}`}
            </Typography>
            <Typography variant='h5' gutterBottom>
              {`Area: ${reimbursement.area}`}
            </Typography>
            {reimbursement.mainLocations.map((mainLocation, index) => (
              <div key={index}>
                <Box mb={2}>
                  <Typography variant='h5'>
                    {`Date: ${new Date(mainLocation.date).toLocaleDateString()}`}
                  </Typography>
                  <Typography variant='h6' gutterBottom>
                    {`Location ${index + 1}: ${mainLocation.location_name}`}
                  </Typography>
                </Box>
                {mainLocation.subLocations.map((subLocation, subIndex) => (
                  <div key={subIndex}>
                    <Box mb={2}>
                      <Typography variant='h6' gutterBottom>
                        {`Travel ${subIndex + 1}: ${subLocation.sub_location_name}`}
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Expense Type</TableCell>
                              <TableCell align='right'>Transportation Type</TableCell>
                              <TableCell align='right'>Amount (₱)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {subLocation.expenses.map((expense, expenseIndex) => (
                              <TableRow key={expenseIndex}>
                                <TableCell component='th' scope='row'>
                                  {expense.expense_type}
                                </TableCell>
                                <TableCell align='right'>{expense.transportation_type}</TableCell>
                                <TableCell align='right'>₱{expense.expense_amount}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={2} style={{ fontWeight: 'bold' }}>Total</TableCell>
                              <TableCell align='right'>
                                ₱{subLocation.expenses.reduce((total, expense) => total + parseFloat(expense.expense_amount), 0)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PastExpenses;
