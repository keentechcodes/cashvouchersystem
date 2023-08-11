import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRequests } from 'src/contexts/RequestsContext';
import { useAuth } from 'src/hooks/use-auth';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}

const PastRequests = () => {
    const { user } = useAuth();
    const [pastRequests, setPastRequests] = useState([]);
    const [open, setOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: "", content: "" });
    const { requestMade } = useRequests();

    const handleClickOpen = (title, content) => {
        setDialogData({ title: title, content: content });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/material_requests');
                setPastRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

    useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/material_requests');
      setPastRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  fetchRequests();
}, [requestMade]); 


    const handleRequestUpdate = async (requestId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/material_requests/${requestId}/approve`);
            setPastRequests(pastRequests.map(request => {
                if (request.id === requestId) {
                    return { ...request, status: status };
                } else {
                    return request;
                }
            }));
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };


    return (
        <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogData.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogData.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Request ID</TableCell>
                        <TableCell>Requestor</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        {user && user.id === 1 && (
                        <TableCell>Actions</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pastRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.requestor}</TableCell>
                            <TableCell>{formatDate(request.date)}</TableCell>
                            <TableCell>{request.designation}</TableCell>
                            <TableCell>{request.branch}</TableCell>
                            <TableCell>
                <Button onClick={() => handleClickOpen('Reason', request.reason)}>
                    View Reason
                </Button>
            </TableCell>
                            <TableCell>
                <Button onClick={() => handleClickOpen('Items', request.items.map(item => `${item.qty} ${item.unit} ${item.specification} @ ₱${item.amount}`).join(', '))}>
                    View Items
                </Button>
            </TableCell>
                            <TableCell>₱{request.total}</TableCell>
                            <TableCell>{request.status}</TableCell>
                            {user && user.id === 1 && (
                <TableCell>
                    <Button color="success" onClick={() => handleRequestUpdate(request.id, 'Approved')}>Approve</Button>
                    <Button color="error" onClick={() => handleRequestUpdate(request.id, 'Disapproved')}>Disapprove</Button>
                </TableCell>
            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default PastRequests;
