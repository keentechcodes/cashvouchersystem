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
import { useAuth } from 'src/hooks/use-auth';


export const CashAdvanceTable = () => {
  // const { cashAdvanceRequests, setCashAdvanceRequests } = useCashAdvanceData();
const [cashAdvanceRequests, setCashAdvanceRequests] = useState([]);
  const { user } = useAuth();

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

  const handleApprove = (id) => {
    // Find the cash advance request with the given id
    const updatedRequests = cashAdvanceRequests.map((request) =>
      request.id === id ? { ...request, status: 'Approved' } : request
    );
    // Update the state with the modified data
    setCashAdvanceRequests(updatedRequests);
  
    // Make a POST request to your backend API to update the status
    fetch(`http://localhost:3002/api/cash-advance-requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Approved' }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optional: You can do something with the response data if needed
        console.log(`Cash advance request with id ${id} has been approved.`);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };
  

  const handleDisapprove = (id) => {
    // Make a POST request to the backend API to set the status to "Disapproved"
    fetch(`http://localhost:3002/api/cash-advance-requests/${id}/disapprove`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the updated data
        const updatedRequests = cashAdvanceRequests.map((request) =>
          request.id === id ? { ...request, status: 'Disapproved' } : request
        );
        setCashAdvanceRequests(updatedRequests);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <Card sx={{ width: '100%', mt: 2 }}>
      <CardHeader title="Cash Advance Requests" />
      <Divider />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Date Borrowed</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cashAdvanceRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{formatDate(request.date_borrowed)}</TableCell>
                  <TableCell>₱{request.amount}</TableCell>
                  <TableCell>{request.terms}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                  <Button
                    variant="contained"
                    style={{backgroundColor: '#0B6623', color: '#fff',marginRight: '10px'}}
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    style={{backgroundColor: '#7C0A02', color: '#fff'}}
                    onClick={() => handleDisapprove(request.id)}
                  >
                    Disapprove
                  </Button>
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'error';
    default:
      return 'default';
  }
};

export default CashAdvanceTable;
