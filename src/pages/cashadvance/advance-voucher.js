import { useState, useEffect } from 'react';
import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Chip,
  Table,
  TableBody,
  Button,
} from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

export const CashAdvanceVoucher = () => {
    const [cashAdvanceRequests, setCashAdvanceRequests] = useState([]);
  
    useEffect(() => {
      // Fetch data from the backend API endpoint
      fetch('http://localhost:3002/api/cash-advance-requests')
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the fetched data
          setCashAdvanceRequests(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    // Function to format the date in the desired format (e.g., "January 1, 2023")
    const formatDate = (dateString) => {
      if (dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } else {
        return '-';
      }
    };
  
    // Filter the cashAdvanceRequests array to show only the data with status "Approved"
    const approvedRequests = cashAdvanceRequests.filter(
      (request) => request.status === 'Approved'
    );
  
    return (
      <Card sx={{ width: '100%', mt: 2 }}>
        <CardHeader title="Approved Cash Advance Requests" />
        <Divider />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date Borrowed</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{formatDate(request.date_borrowed)}</TableCell>
                    <TableCell>₱{request.amount}</TableCell>
                    <TableCell>{request.terms}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

  const Page = () => {
    return (
      <>
        <Head>
          <title>Cash Advance Voucher | One Agno Medical Solutions</title>
        </Head>
        <Box sx={{ mt: 4 }}>
          <CashAdvanceVoucher />
        </Box>
      </>
    );
  };
  
  Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;



