import { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios'; // Make sure axios is installed

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}

const MaterialVoucherTable = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/material_requests/vouchers')
      .then(res => {
        // Group the result by voucher_id
        const groupedData = res.data.reduce((groupedVouchers, row) => {
          (groupedVouchers[row.voucher_id] = groupedVouchers[row.voucher_id] || []).push(row);
          return groupedVouchers;
        }, {});

        const vouchersArray = Object.values(groupedData).map(voucherRows => {
          const { voucher_id, voucher_date, requester, request_date, designation, branch, reason, request_total } = voucherRows[0];
          const items = voucherRows.map(({ qty, unit, specification, item_amount }) => ({ qty, unit, specification, amount: item_amount }));
          return { id: voucher_id, date: voucher_date, requester, request_date, designation, branch, reason, total: request_total, items };
        });

        setVouchers(vouchersArray);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClose = () => {
    setSelectedVoucher(null);
  };

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
  };

  if (loading) return <CircularProgress />; // Show loading indicator while data is being fetched

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
                  <TableCell>{formatDate(voucher.date)}</TableCell>
                  <TableCell>{voucher.requester}</TableCell>
                  <TableCell>{voucher.designation}</TableCell>
                  <TableCell>{voucher.branch}</TableCell>
                  <TableCell>{voucher.reason}</TableCell>
                  <TableCell>{voucher.items ? voucher.items.map(item => `${item.qty} ${item.unit} ${item.specification} @ ₱${item.amount}`).join(', ') : 'No items available'}</TableCell>
                  <TableCell>₱{voucher.total}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleVoucherSelect(voucher)}>View</Button>
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
