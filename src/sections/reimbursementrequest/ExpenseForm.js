import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

const ExpenseForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState('Anika Visser');
  const [area, setArea] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [today, setToday] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fields, setFields] = useState([
    {
      mainLocation: '',
      date: null,
      subLocations: [
        {
          subLocationName: '',
          expenses: [
            {
              expenseType: '',
              transportationType: '',
              expenseAmount: 0,
            },
          ],
        },
      ],
      total: 0,
    },
  ]);

  useEffect(() => {
    if (user && user.fullname) {
        setName(user.fullname);
    }
}, [user]);


  const addSubLocation = (index) => {
    const newFields = [...fields];
    newFields[index].subLocations.push({
      subLocationName: '',
      expenses: [
        {
          expenseType: '',
          transportationType: '',
          expenseAmount: 0,
        },
      ],
    });
    setFields(newFields);
  };

  const addExpense = (mainIndex, subIndex) => {
    const newFields = [...fields];
    newFields[mainIndex].subLocations[subIndex].expenses.push({
      expenseType: '',
      transportationType: '',
      expenseAmount: 0,
    });
    setFields(newFields);
  };

  const removeExpense = (mainIndex, subIndex, expenseIndex) => {
  const newFields = [...fields];
  newFields[mainIndex].subLocations[subIndex].expenses.splice(expenseIndex, 1);
  setFields(newFields);
};

const removeSubLocation = (mainIndex, subIndex) => {
  const newFields = [...fields];
  newFields[mainIndex].subLocations.splice(subIndex, 1);
  setFields(newFields);
};


  const addMainLocation = () => {
    setFields([
      ...fields,
      {
        mainLocation: '',
        date: null,
        subLocations: [
          {
            subLocationName: '',
            expenses: [
              {
                expenseType: '',
                transportationType: '',
                expenseAmount: 0,
              },
            ],
          },
        ],
        total: 0,
      },
    ]);
  };

  const removeMainLocation = (mainIndex) => {
  const newFields = [...fields];
  newFields.splice(mainIndex, 1);
  setFields(newFields);
};


  const handleChange = (mainIndex, subIndex, expenseIndex, event) => {
    const newFields = [...fields];
    const value = event.target.name === 'expenseAmount' ? parseFloat(event.target.value) : event.target.value;
    newFields[mainIndex].subLocations[subIndex].expenses[expenseIndex][event.target.name] = value;
    setFields(newFields);
  };

  const calculateMainTotal = (mainIndex) => {
    let total = 0;
    fields[mainIndex].subLocations.forEach((subLocation) => {
      subLocation.expenses.forEach((expense) => {
        total += expense.expenseAmount;
      });
    });
    return total;
  };

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    fields.forEach((field) => {
      field.subLocations.forEach((subLocation) => {
        subLocation.expenses.forEach((expense) => {
          grandTotal += expense.expenseAmount;
        });
      });
    });
    return grandTotal;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Basic form validation
  if (!name || !area || !dateRange[0] || !dateRange[1]) {
    setErrorMessage('Please fill out all required fields!');
    return;
  } else {
    setErrorMessage(null);
  }

  try {
    const response = await fetch('http://localhost:5000/reimbursements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, area, dateRange, today, fields }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json();

    // Display success message
    setSuccessMessage('Form submitted successfully!');

    // Clear the form
    setName('John Doe');
    setArea('');
    setDateRange([null, null]);
    setToday(new Date());
    setFields([
      {
        mainLocation: '',
        date: null,
        subLocations: [
          {
            subLocationName: '',
            expenses: [
              {
                expenseType: '',
                transportationType: '',
                expenseAmount: 0,
              },
            ],
          },
        ],
        total: 0,
      },
    ]);
  } catch (error) {
    console.log('There was a problem with your fetch operation: ', error);
  }
};

  return (
    <Box component='form' onSubmit={handleSubmit}>
      {errorMessage && (
      <Typography variant='body1' color='error'>
        {errorMessage}
      </Typography>
    )}
    {successMessage && (
      <Typography variant='body1' color='success.main'>
        {successMessage}
      </Typography>
    )}
      <Card>
        <CardHeader title='Expense Report Form' />
        <Divider />
        <CardContent>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
    label='Name'
    value={name}
    InputProps={{ readOnly: true }}
    fullWidth
    margin='normal'
/>

                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label='Area'
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label='Today'
                    type="date"
                    value={today.toISOString().split('T')[0]} // convert Date object to 'yyyy-mm-dd' format
                    onChange={(e) => setToday(new Date(e.target.value))}
                    fullWidth
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Period Covered Start'
                    type="date"
                    value={dateRange[0] ? dateRange[0].toISOString().split('T')[0] : ''}
                    onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
                    fullWidth
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Period Covered End'
                    type="date"
                    value={dateRange[1] ? dateRange[1].toISOString().split('T')[0] : ''}
                    onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
                    fullWidth
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            {fields.map((mainLocation, mainIndex) => (
              <Grid item key={mainIndex}>
                <Box mb={2}>
                  <Typography variant='h6'>{`Date / Location ${mainIndex + 1}`}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label='Date'
                        type="date"
                        value={mainLocation.date ? mainLocation.date.toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                          const newFields = [...fields];
                          newFields[mainIndex].date = new Date(e.target.value);
                          setFields(newFields);
                        }}
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name='mainLocation'
                        label='Location'
                        value={mainLocation.mainLocation}
                        onChange={(e) => {
                          const newFields = [...fields];
                          newFields[mainIndex].mainLocation = e.target.value;
                          setFields(newFields);
                        }}
                        fullWidth
                        margin='normal'
                      />
                    </Grid>
                  </Grid>
                </Box>
                {mainLocation.subLocations.map((subLocation, subIndex) => (
                  <Box mb={2} key={subIndex}>
                    <Typography variant='h6'>{`Travel ${subIndex + 1}`}</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name='subLocationName'
                          label='Travel Description'
                          value={subLocation.subLocationName}
                          onChange={(e) => {
                            const newFields = [...fields];
                            newFields[mainIndex].subLocations[subIndex].subLocationName = e.target.value;
                            setFields(newFields);
                          }}
                          fullWidth
                          margin='normal'
                        />
                      </Grid>
                      {subLocation.expenses.map((expense, expenseIndex) => (
                        <React.Fragment key={expenseIndex}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin='normal'>
                              <InputLabel>Expense Type</InputLabel>
                              <Select
                                name='expenseType'
                                value={expense.expenseType}
                                onChange={(e) => handleChange(mainIndex, subIndex, expenseIndex, e)}
                              >
                                <MenuItem value={'Meals'}>Meals</MenuItem>
                                <MenuItem value={'Transportation'}>Transportation</MenuItem>
                                <MenuItem value={'Office Supplies'}>Office Supplies</MenuItem>
                                <MenuItem value={'Meetings/Conferences'}>
                                  Meetings/Conferences
                                </MenuItem>
                                <MenuItem value={'Others'}>Others</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name='expenseAmount'
                              label='Total'
                              type='number'
                              value={expense.expenseAmount}
                              onChange={(e) => handleChange(mainIndex, subIndex, expenseIndex, e)}
                              fullWidth
                              margin='normal'
                              InputProps={{
                                startAdornment: <InputAdornment position='start'>₱</InputAdornment>,
                              }}
                            />
                          </Grid>
                          {expense.expenseType === 'Transportation' && (
                            <Grid item xs={12}>
                              <FormControl fullWidth margin='normal'>
                                <InputLabel>Transportation Type</InputLabel>
                                <Select
                                  name='transportationType'
                                  value={expense.transportationType}
                                  onChange={(e) => handleChange(mainIndex, subIndex, expenseIndex, e)}
                                >
                                  <MenuItem value={'Bus'}>Bus</MenuItem>
                                  <MenuItem value={'Jeep'}>Jeep</MenuItem>
                                  <MenuItem value={'Tricycle'}>Tricycle</MenuItem>
                                  <MenuItem value={'Van'}>Van</MenuItem>
                                  <MenuItem value={'Toll Fee'}>Toll Fee</MenuItem>
                                  <MenuItem value={'Others'}>Others</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          )}
                        </React.Fragment>
                      ))}
                      <Grid item xs={12}>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => addExpense(mainIndex, subIndex)}
                        >
                          Add Expense
                        </Button>
                        {subLocation.expenses.length > 1 && (
<Button
  variant='outlined'
  color='secondary'
  onClick={() => removeExpense(mainIndex, subIndex, subLocation.expenses.length - 1)}
  style={{ marginLeft: '1em' }}
>
  Remove Expense
</Button>
)}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Grid item>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => addSubLocation(mainIndex)}
                  >
                    Add New Travel
                  </Button>
                 {mainLocation.subLocations.length > 1 && (
<Button
  variant='outlined'
  color='secondary'
  onClick={() => removeSubLocation(mainIndex, mainLocation.subLocations.length - 1)}
  style={{ marginLeft: '1em' }}
>
  Remove Travel
</Button>
)}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                  <Typography variant='h6'>
                    {`Total for this Date: ₱${calculateMainTotal(mainIndex)}`}
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid item>
              <Button
                variant='outlined'
                color='primary'
                onClick={addMainLocation}
                style={{ marginTop: '1em' }}
              >
                Add New Date / Location
              </Button>
              {fields.length > 1 && (
    <Button
      variant='outlined'
      color='secondary'
      onClick={() => removeMainLocation(fields.length - 1)}
      style={{ marginTop: '1em', marginLeft: '1em' }}
    >
      Remove Date / Location
    </Button>
  )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Typography variant='h5'>
                {`Grand Total: ₱${calculateGrandTotal()}`}
              </Typography>
            </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExpenseForm;

