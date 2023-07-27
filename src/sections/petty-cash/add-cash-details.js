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
  Grid
} from '@mui/material';

const cashCategory = [
  {
    value: '',
    label: 'Select Category',
  },
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
];

export const AddCashDetails = () => {
  const [values, setValues] = useState({
    amount: '',
    dateOfEntry: '',
    replenishedBy: '',
    cashCategory: '',
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
        formData.append('replenishedBy', values.replenishedBy);
        formData.append('selectedFile', selectedFile); // Append the file to the FormData
        formData.append('cashCategory', values.cashCategory); // Correctly append cashCategory

        const response = await fetch("http://localhost:5000/petty-cash", {
          method: "POST",
          body: formData, // Use the FormData as the request body
        });

        if (!response.ok) {
          // Handle error response here
          const errorData = await response.json();
          console.error('Error:', errorData.message);
          return;
        }

        // Assuming the server returns a JSON response, you can parse it like this:
        const data = await response.json();
        console.log('New row inserted:', data); // The inserted row data will be available in the "data" variable
      } catch (error) {
        console.error(error.message);
      }
    },
    [values, selectedFile]
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title="Add Petty Cash"
          subheader="Fill all requirements below"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Replenished By"
                  helperText="(Last Name, First Name)"
                  name="replenishedBy"
                  onChange={handleChange}
                  required
                  value={values.replenishedBy}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ border: '1px solid #e9ebef' }}>
                  <CardHeader
                    subheader={
                      <input type="date" name="dateOfEntry" onChange={handleChange} />
                    }
                    title="Date of Entry"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ border: '1px solid #e9ebef' }}>
                  <CardHeader
                    subheader={
                      <input type="file" name="selectedFile" onChange={handleFileChange} />
                    }
                    title="Receipt/Documentation"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Cash Category</InputLabel>
                  <Select
                    label="Cash Category"
                    name="cashCategory"
                    onChange={handleChange}
                    required
                    value={values.cashCategory}
                  >
                    {cashCategory.map((category) => (
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
          <Button variant="contained" type="submit">
            Add Petty Cash
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
