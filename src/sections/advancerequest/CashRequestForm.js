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
import { useAuth } from 'src/hooks/use-auth';

export const CashRequestForm = () => {
  const [values, setValues] = useState({
    dateBorrowed: '',
    designation: '',
    amount: '',
    terms: '',
    note: false,
    customTerms: ''
  });
  const auth = useAuth();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckboxChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
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
                value={auth.user.name}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
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
