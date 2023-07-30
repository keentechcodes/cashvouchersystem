import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  MenuItem
} from '@mui/material';

export const CashRequestForm = () => {
  const [values, setValues] = useState({
    name: '',
    dateBorrowed: '',
    designation: '',
    amount: '',
    terms: '',
    note: false,
    customTerms: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckboxChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make the POST request to the backend route with form data
      const response = await fetch('http://localhost:3002/api/submit-cash-advance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response (you can show a success message, redirect, etc.)
      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting form:', error);
    }
  };

  const termsOptions = [
    '6 months',
    '5 months',
    '4 months',
    '3 months',
    '2 months',
    '1 month',
    '15 days',
    'Others'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: '100%' }}>
        <CardHeader title="Cash Advance Form" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                onChange={handleChange} // Add this to update the name in the state
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date Borrowed"
                name="dateBorrowed"
                type="date"
                value={values.dateBorrowed}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cash Advance Amount"
                name="amount"
                type="number"
                value={values.amount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.note}
                    onChange={handleCheckboxChange}
                    name="note"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="caption">
                    I authorize salary deduction (twice a month) as mode of payment for the loan applied with the term and amount as specificed. Any outstanding loans in the company must be fully-paid to be cleared prior to re-applying for another loan or seperation from service.
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Term of Payment"
                name="terms"
                value={values.terms}
                onChange={handleChange}
                variant="outlined"
              >
                {termsOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {values.terms === 'Others' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Specify Custom Date"
                  name="customTerms"
                  type="number"
                  value={values.customTerms}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <Typography variant="caption">days</Typography>
                  }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default CashRequestForm;
