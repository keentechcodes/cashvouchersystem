import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PastRequests = () => {
    const pastRequests = [
        { controlNumber: "CN20220515", requestor: "John Doe", date: "2022-06-15", items: ['Pens', 'Notebooks'], total: "₱200", status: "Pending" },
        { controlNumber: "CN20220710", requestor: "Jane Doe", date: "2022-07-10", items: ['Printers', 'Ink cartridges'], total: "₱2500", status: "Approved" },
        { controlNumber: "CN20220711", requestor: "John Smith", date: "2022-07-11", items: ['USB sticks', 'External hard drives'], total: "₱3000", status: "Pending" }
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Control Number</TableCell>
                        <TableCell>Requestor</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pastRequests.map((request) => (
                        <TableRow key={request.controlNumber}>
                            <TableCell>{request.controlNumber}</TableCell>
                            <TableCell>{request.requestor}</TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>{request.items.join(', ')}</TableCell>
                            <TableCell>{request.total}</TableCell>
                            <TableCell>{request.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PastRequests;
