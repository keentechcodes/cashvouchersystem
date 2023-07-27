import { useCallback, useState } from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const expenseCategory = [
  {
    value: '',
    label: 'Select Expense Category', // Add a label for the default option
  },
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'office-supplies',
    label: 'Office Supplies',
  },
  {
    value: 'rfid',
    label: 'RFID',
  },
  {
    value: 'gas',
    label: 'Gas',
  },
  {
    value: 'misc',
    label: 'Miscellaneous',
  },
];

export const RecordExpensesDetails = () => {
  const [values, setValues] = useState({
    amount: '',
    dateOfEntry: '',
    expenseCategory: '',
    reimbursedBy: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();
        formData.append('amount', values.amount);
        formData.append('dateOfEntry', values.dateOfEntry);
        formData.append('expenseCategory', values.expenseCategory);
        formData.append('reimbursedBy', values.reimbursedBy);
        formData.append('selectedFile', selectedFile);

        // Implement the fetch request here for recording expenses
        // For example, you can use a different URL or endpoint specific to recording expenses
        // Replace 'http://localhost:5000/record-expenses' with the appropriate URL
        const response = await fetch('http://localhost:5000/record-expenses', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          // Handle error response here
          const errorData = await response.json();
          console.error('Error:', errorData.message);
          return;
        }

        // Assuming the server returns a JSON response, you can parse it like this:
        const data = await response.json();
        console.log('Expense recorded:', data); // The recorded expense data will be available in the "data" variable
      } catch (error) {
        console.error(error.message);
      }
    },
    [values, selectedFile]
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Record Expenses" subheader="Fill all requirements below" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Enter Amount in PHP"
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  required
                  value={values.amount}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Reimbursed By"
                  helperText="(Last Name, First Name)"
                  name="reimbursedBy"
                  onChange={handleChange}
                  required
                  value={values.reimbursedBy}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Card style={{ border: '1px solid #e9ebef' }}>
                  <CardHeader
                    subheader={
                      <input type="date" name="dateOfEntry" onChange={handleChange} />
                    }
                    title="Date of Entry"
                  />
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <Card style={{ border: '1px solid #e9ebef' }}>
                  <CardHeader
                    subheader={
                      <input type="file" name="selectedFile" onChange={handleFileChange} />
                    }
                    title="Receipt/Documentation"
                  />
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Expense Category</InputLabel>
                  <Select
                    label="Select Expense Category"
                    name="expenseCategory"
                    onChange={handleChange}
                    required
                    value={values.expenseCategory}
                  >
                    {expenseCategory.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Record Expense
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
