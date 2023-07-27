import { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const MaterialVoucherTable = () => {
  const [vouchers, setVouchers] = useState([
    { 
        id: 'V1234', date: '2023-07-25', requester: 'John Doe', 
        designation: 'Designation 1', branch: 'Branch 1', reason: 'Reason 1',
        items: [{ qty: "1", unit: "Box", specification: "Pens", amount: "100" }, { qty: "2", unit: "Packs", specification: "Notebooks", amount: "100" }],
        total: '6000'
    },
    // add more mock data as needed
  ]);

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleClose = () => {
    setSelectedVoucher(null);
  };

  return (
    <Card sx={{ width: '100%', mt: 2 }}>
      <CardHeader title="Material Vouchers" />
      <Divider />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Voucher ID</TableCell>
                <TableCell>Voucher Date</TableCell>
                <TableCell>Requested By</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Voucher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers.map((voucher, index) => (
                <TableRow key={index}>
                  <TableCell>{voucher.id}</TableCell>
                  <TableCell>{voucher.date}</TableCell>
                  <TableCell>{voucher.requester}</TableCell>
                  <TableCell>{voucher.designation}</TableCell>
                  <TableCell>{voucher.branch}</TableCell>
                  <TableCell>{voucher.reason}</TableCell>
                  <TableCell>{voucher.items.map(item => `${item.qty} ${item.unit} ${item.specification} @ ₱${item.amount}`).join(', ')}</TableCell>
                  <TableCell>₱{voucher.total}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => setSelectedVoucher(voucher)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedVoucher && (
          <Dialog open={!!selectedVoucher} onClose={handleClose} aria-labelledby="voucher-detail-dialog">
            <DialogTitle id="voucher-detail-dialog">{`Voucher ${selectedVoucher.id} Details`}</DialogTitle>
            <DialogContent>
              <Box sx={{ minWidth: '500px', maxWidth: '500px', flexGrow: 1, py: 4 }}> 
                <Box my={1}>
                  <Typography variant="body1"><strong>Date:</strong> {selectedVoucher.date}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Requested By:</strong> {selectedVoucher.requester}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Designation:</strong> {selectedVoucher.designation}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Branch:</strong> {selectedVoucher.branch}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Reason:</strong> {selectedVoucher.reason}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Items:</strong> {selectedVoucher.items.map(item => `${item.qty} ${item.unit} ${item.specification} @ ₱${item.amount}`).join(', ')}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Total Cost:</strong> ₱{selectedVoucher.total}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

export default MaterialVoucherTable;
