import React, { useState, useEffect } from 'react';
import {
  useTheme,
  Avatar,
  Card,
  CardContent,
  Grid,
  SvgIcon,
  Stack,
  Typography,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon'; // Fixed import typo
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon'; // Fixed import typo
import CircleStackIcon from '@heroicons/react/24/solid/CircleStackIcon'; // Add missing import
import { OverviewExpenses } from 'src/sections/petty-cash/check-balance-parts/overview-expenses';
import { Chart } from 'src/components/chart';
import { AddCashTable } from 'src/sections/petty-cash/check-balance-parts/add-cash-table'; // Replace './path/to/add-cash-table' with the actual path to the AddCashTable component file
import { RecordExpensesTable } from 'src/sections/petty-cash/check-balance-parts/record-expenses-table'; // Replace './path/to/add-cash-table' with the actual path to the AddCashTable component file

const transformLabel = (label) => {
  // Split the label by '-', capitalize each word, and join them back
  if (label === 'rfid') {
    return label.toUpperCase();
  }
  return label.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const CheckBalance = (props) => {
  const [currentBalance, setCurrentBalance] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [chartSeriesData, setChartSeriesData] = useState([]);
  const [labelsData, setLabelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');
  const [cashEntries, setCashEntries] = useState([]);
  const [recordExpenses, setRecordExpenses] = useState([]);

  useEffect(() => {
    // Fetch both check balance and add cash entries data
    Promise.all([fetchCheckBalance(), fetchAddCashEntries()]).then(([checkBalanceData, addCashData]) => {
      setCurrentBalance(parseFloat(checkBalanceData.currentBalance));
      setTotalExpenses(parseFloat(checkBalanceData.totalExpenses));
      setTotalBalance(parseFloat(checkBalanceData.totalCash));
      setLoading(false);

      // Calculate chartSeriesData and labelsData after getting expenses summary data
      const chartSeriesData = checkBalanceData.chartSummaryData.map((expense) => parseFloat(expense.total_expenses));
      const labelsData = checkBalanceData.chartSummaryData.map((expense) => expense.expense_category);

      // Convert chartSeriesData to a set to remove duplicates, then back to an array
      const uniqueChartSeriesData = Array.from(new Set(chartSeriesData));

      setChartSeriesData(chartSeriesData);
      setLabelsData(labelsData);

      // Add more unique labels to labelsData array
      const transformedLabels = labelsData.map(transformLabel);
      setLabelsData(transformedLabels);

      // Set the cashEntries data
      setCashEntries(addCashData);
      fetchRecordExpenses();
    });
  }, []);

  const fetchRecordExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/record-expenses'); // Replace the URL with the correct endpoint for fetching record_expenses data
      const data = await response.json();
  
      // Check if data is an array
      if (!Array.isArray(data)) {
        console.error('Invalid data format. Expected an array of record expenses entries.');
        return;
      }
  
      setRecordExpenses(data); // Update the state with the fetched data
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchCheckBalance = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-balance');
      const data = await response.json();

      // Check if data.chartSummaryData is an array
      if (!Array.isArray(data.chartSummaryData)) {
        console.error('Invalid data format. Expected "chartSummaryData" to be an array.');
        return {};
      }

      // Check if each item in the array contains the expected properties
      const hasExpectedProperties = data.chartSummaryData.every(
        (expense) => 'total_expenses' in expense && 'expense_category' in expense
      );
      if (!hasExpectedProperties) {
        console.error('Invalid data format. Each item in "chartSummaryData" should have "total_expenses" and "expense_category" properties.');
        return {};
      }

      return {
        currentBalance: parseFloat(data.currentBalance),
        totalExpenses: parseFloat(data.totalExpenses),
        totalCash: parseFloat(data.totalCash),
        chartSummaryData: data.chartSummaryData,
      };
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const fetchAddCashEntries = async () => {
    try {
      const response = await fetch('http://localhost:5000/add-cash-entries');
      const data = await response.json();

      // Check if data is an array
      if (!Array.isArray(data)) {
        console.error('Invalid data format. Expected an array of add cash entries.');
        return [];
      }

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch add cash entries data when selectedTimeRange changes
    fetchAddCashEntries(selectedTimeRange).then((addCashData) => {
      setCashEntries(addCashData);
    });
  }, [selectedTimeRange]);


  const deleteCashEntry = async (entryId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-cash-entry/${entryId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      // If deletion is successful, update the frontend state to remove the deleted entry
      setCashEntries((prevCashEntries) => prevCashEntries.filter((entry) => entry.add_cash_id !== entryId));
  
      // Update the current balance by subtracting the deleted entry's amount
      setCurrentBalance((prevBalance) => {
        const deletedEntry = cashEntries.find((entry) => entry.add_cash_id === entryId);
        return prevBalance - parseFloat(deletedEntry.amount);
      });
    } catch (error) {
      console.error('Error deleting cash entry:', error.message);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const deleteRecordExpense = async (entryId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-record-expense/${entryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // If deletion is successful, update the frontend state to remove the deleted entry
      setRecordExpenses((prevRecordExpenses) => prevRecordExpenses.filter((entry) => entry.record_expenses_id !== entryId));
    } catch (error) {
      console.error('Error deleting record expense entry:', error.message);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };
  
  useEffect(() => {
    // Fetch check balance data (including chart data) and add cash entries data
    fetchCheckBalance().then((checkBalanceData) => {
      setCurrentBalance(parseFloat(checkBalanceData.currentBalance));
      setTotalExpenses(parseFloat(checkBalanceData.totalExpenses));
      setTotalBalance(parseFloat(checkBalanceData.totalCash));
      setLoading(false);

      // Calculate chartSeriesData and labelsData after getting expenses summary data
      const chartSeriesData = checkBalanceData.chartSummaryData.map((expense) => parseFloat(expense.total_expenses));
      const labelsData = checkBalanceData.chartSummaryData.map((expense) => expense.expense_category);

      // Convert chartSeriesData to a set to remove duplicates, then back to an array
      const uniqueChartSeriesData = Array.from(new Set(chartSeriesData));

      setChartSeriesData(chartSeriesData);
      setLabelsData(labelsData);

      // Add more unique labels to labelsData array
      const transformedLabels = labelsData.map(transformLabel);
      setLabelsData(transformedLabels);
    });
  }, [recordExpenses]);
  

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: '#1c2536' }}>
          <CardContent>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Stack spacing={1}>
                <Typography color="#FFFFF0" variant="overline">
                  Current Balance
                </Typography>
                <Typography color="white" variant="h4">
                  ₱ {currentBalance}
                </Typography>
              </Stack>
              <Avatar sx={{ backgroundColor: '#3F704D', height: 56, width: 56 }}>
                <SvgIcon>
                  <WalletIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: '#1c2536' }}>
          <CardContent>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Stack spacing={1}>
                <Typography color="#FFFFF0" variant="overline">
                  Total Expenses
                </Typography>
                <Typography color="white" variant="h4">
                  ₱ {totalExpenses}
                </Typography>
              </Stack>
              <Avatar sx={{ backgroundColor: '#7C0A02', height: 56, width: 56 }}>
                <SvgIcon>
                  <BanknotesIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2}>
      {/* Left column for the OverviewExpenses chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Expenses Summary" />
          <CardContent>
            <OverviewExpenses chartSeries={chartSeriesData} labels={labelsData} sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      </Grid>

      {/* Right column for the two tables */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Add Cash Entries" />
              <CardContent>
              <AddCashTable cashEntries={cashEntries}  onDelete={deleteCashEntry}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Record Expenses" />
              <CardContent>
              <RecordExpensesTable onDelete={deleteRecordExpense} recordExpenses={recordExpenses} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Grid>
  );
};

CheckBalance.propTypes = {
  value: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string.isRequired,
};

export default CheckBalance;
