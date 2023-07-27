import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Card, CardContent, CardHeader, Grid, Divider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import axios from 'axios';
import { useRequests } from 'src/contexts/RequestsContext';

const MaterialRequestForm = () => {
    const { user } = useAuth();
    const { toggleRequestMade } = useRequests();

    const [formData, setFormData] = useState({
        requestor: user.name,
        date: new Date().toISOString().split("T")[0],
        designation: "",
        branch: "",
        reason: "",
        items: [{ qty: "", unit: "", specification: "", amount: "" }],
        total: ""
    });

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    }

    const handleItemChange = (index, field) => (e) => {
        const newItems = [...formData.items];
        newItems[index][field] = e.target.value;
        setFormData({ ...formData, items: newItems });
    }

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { qty: "", unit: "", specification: "", amount: "" }] });
    }

const handleSubmit = async (e) => {
  e.preventDefault();
  // Simple validation
  if (!formData.designation || !formData.branch || !formData.reason || formData.items.some(item => !item.qty || !item.unit || !item.specification || !item.amount)) {
    setError("Please fill all the required fields.");
    return;
  }
  try {
    const total = calculateTotal();
    const response = await axios.post('http://localhost:5000/api/material_requests/', {...formData, total });
    console.log(response.data);
    toggleRequestMade();
    // reset form data
    setFormData({
      requestor: user.name,
      date: new Date().toISOString().split("T")[0],
      designation: "",
      branch: "",
      reason: "",
      items: [{ qty: "", unit: "", specification: "", amount: "" }],
      total: ""
    });
    // clear error
    setError("");
    // close form
    setOpen(false);
  } catch (error) {
    console.error('Error submitting material request:', error);
    setError("There was an error submitting your request. Please try again.");
  }
}


    const calculateTotal = () => {
  return formData.items.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
};


    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <Button onClick={() => setOpen(!open)}>Add New Material Request</Button>
            <Collapse in={open}>
                <Card sx={{ width: '100%', mt: 2 }}>
                    <CardHeader title="Material Request Form" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Requestor's Name"
                                    name="name"
                                    value={formData.requestor}
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange('date')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange('designation')}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Branch"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange('branch')}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Reason/Justification for Requisition"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange('reason')}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Unit</TableCell>
                                        <TableCell>Item Specification</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formData.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField value={item.qty} onChange={handleItemChange(index, 'qty')} required />
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={item.unit} onChange={handleItemChange(index, 'unit')} required />
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={item.specification} onChange={handleItemChange(index, 'specification')} required />
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={item.amount} onChange={handleItemChange(index, 'amount')} required />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <IconButton onClick={addItem}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Collapse>
        </Box>
    );
}

export default MaterialRequestForm;
