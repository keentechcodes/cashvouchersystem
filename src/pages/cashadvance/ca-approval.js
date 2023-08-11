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
import { useAuth } from 'src/hooks/use-auth';

export const CashAdvanceApproval = () => {
    const [cashAdvanceRequests, setCashAdvanceRequests] = useState([]);
    const { user } = useAuth(); // Fetch current user info

  
    useEffect(() => {
        // Fetch data from the backend API endpoint
        fetch(`http://localhost:3002/api/cash-advance-requests/${encodeURIComponent(user.fullname)}`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                // Update the state with the fetched data
                setCashAdvanceRequests(data);
            } else {
                console.error('Received data is not an array:', data);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });    
      }, [user.fullname]);
  
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
  
    // Filter the cashAdvanceRequests array to show only the data of the current user
    const userRequests = Array.isArray(cashAdvanceRequests) 
    ? cashAdvanceRequests.filter((request) => request.name === user.fullname) 
    : [];

  
    return (
      <Card sx={{ width: '100%', mt: 2 }}>
        <CardHeader title="Your Cash Advance Requests" />
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
                {userRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{formatDate(request.date_borrowed)}</TableCell>
                    <TableCell>₱{request.amount}</TableCell>
                    <TableCell>{request.terms}</TableCell>
                    <TableCell>
                    {request.status === 'Approved' ? (
                        <Chip label="Approved" style={{backgroundColor: '#0B6623', color: '#fff'}} />
                    ) : (
                        <Chip label="Disapproved" style={{backgroundColor: '#7C0A02', color: '#fff'}} />
                    )}
                    </TableCell>

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
          <CashAdvanceApproval />
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
