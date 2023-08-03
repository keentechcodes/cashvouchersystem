import { useState } from 'react';
import { Box, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, CardHeader, Grid, Divider, Chip, Table, TableBody } from '@mui/material';

const SalaryDeductionTable = () => {
    // This is some mock data
    const [deductions, setDeductions] = useState([
        {date: '2023-06-25', amountPaid: 1000, verification: true, balance: 5000},
        {date: '2023-05-25', amountPaid: 1000, verification: false, balance: 6000},
    ]);
    const [pending, setPending] = useState(5000);
    const [paid, setPaid] = useState(2000);

    return (
        <Card sx={{ width: '100%', mt: 2 }}>
            <CardHeader title="Payment Acknowledgement thru Salary Deduction" />
            <Divider />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount Paid</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deductions.map((deduction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{deduction.date}</TableCell>
                                    <TableCell>₱{deduction.amountPaid}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={deduction.verification ? "Accepted" : "Unaccepted"}
                                            color={deduction.verification ? "success" : "warning"}
                                        />
                                    </TableCell>
                                    <TableCell>₱{deduction.balance}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex', p: 2 }}>
                    <Box sx={{ mr: 2 }}>
                        <b>Pending:</b> ₱{pending}
                    </Box>
                    <Box>
                        <b>Paid:</b> ₱{paid}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}


export default SalaryDeductionTable;
