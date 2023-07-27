import { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const PurchaseOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/approved_orders');
        console.log('API response:', response.data);
        setOrders(response.data);
        const itemsResponse = await axios.get('http://localhost:5000/material_request_items');
        console.log('Items response:', itemsResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderSelect = (order) => {
    const orderItems = items.filter(item => item.material_request_id === order.id);
    setSelectedOrder({...order, items: orderItems});
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  const handleCreateVoucher = async (order) => {
    try {
      // Create voucher here
      const response = await axios.put(`http://localhost:5000/api/orders/po/${order.id}/convert`);
      console.log(`Voucher created for order ${order.id}`);
    } catch (error) {
      console.error('Error creating voucher:', error);
    }
  };

  return (
    <Card sx={{ width: '100%', mt: 2 }}>
      <CardHeader title="Approved Purchase Requests" />
      <Divider />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Purchase Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Requestor</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} onClick={() => setSelectedOrder(order)} style={{cursor: 'pointer'}}>
                  <TableCell>{order.purchase_order_id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.requestor}</TableCell>
                  <TableCell>{order.designation}</TableCell>
                  <TableCell>{order.branch}</TableCell>
                  <TableCell>{order.reason}</TableCell>
                  <TableCell>₱{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedOrder && (
          <Dialog open={!!selectedOrder} onClose={handleClose} aria-labelledby="order-detail-dialog">
            <DialogTitle id="order-detail-dialog">{`Order ${selectedOrder.id} Details`}</DialogTitle>
            <DialogContent>
              <Box sx={{ minWidth: '500px', maxWidth: '500px', flexGrow: 1, py: 1 }}> 
                <Box my={1}>
                  <Typography variant="body1"><strong>Date:</strong> {selectedOrder.date}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Requested By:</strong> {selectedOrder.requestor}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Designation:</strong> {selectedOrder.designation}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Branch:</strong> {selectedOrder.branch}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Reason:</strong> {selectedOrder.reason}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Purchase Order ID:</strong> {selectedOrder.purchase_order_id}</Typography>
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Items:</strong></Typography>
                  {selectedOrder.items && selectedOrder.items.map(item => (
              <Typography variant="body2" key={item.id}>{`${item.qty} ${item.unit} ${item.specification} @ ₱${item.amount}`}</Typography>
            ))}
                </Box>
                <Box my={1}>
                  <Typography variant="body1"><strong>Total Cost:</strong> ₱{selectedOrder.total}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={() => handleCreateVoucher(selectedOrder)}>Create Voucher</Button>
            </DialogActions>
          </Dialog>
        )}

      </CardContent>
    </Card>
  );
}

export default PurchaseOrderTable;
