import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse } from '@mui/material';
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from 'src/hooks/use-auth';

const MaterialRequestForm = () => {
    const { user } = useAuth(); // Using the useAuth hook here to get the current user's details

    const [formData, setFormData] = useState({
        requestor: user.name, // Autofill with current user's name
        date: new Date().toISOString().split("T")[0], // Auto-fill with today's date
        designation: "",
        branch: "",
        reason: "",
        items: [{ qty: "", unit: "", specification: "", amount: "" }],
        total: ""
    });

    const [open, setOpen] = useState(false); // state to control the form visibility

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

    return (
        <Box component="form">
            <Button onClick={() => setOpen(!open)}>Add New Material Request</Button> {/* Button to toggle form visibility */}
            <Collapse in={open}> {/* Collapse component wraps the form */}
                <TextField label="Requestor's Name" value={formData.requestor} onChange={handleInputChange('requestor')} fullWidth disabled /> {/* Disabled field */}
                <TextField label="Date" type="date" value={formData.date} onChange={handleInputChange('date')} fullWidth />
                <TextField label="Designation" value={formData.designation} onChange={handleInputChange('designation')} fullWidth />
                <TextField label="Branch" value={formData.branch} onChange={handleInputChange('branch')} fullWidth />
                <TextField label="Reason/Justification for Requisition" value={formData.reason} onChange={handleInputChange('reason')} fullWidth />

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
                                        <TextField value={item.qty} onChange={handleItemChange(index, 'qty')} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={item.unit} onChange={handleItemChange(index, 'unit')} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={item.specification} onChange={handleItemChange(index, 'specification')} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={item.amount} onChange={handleItemChange(index, 'amount')} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <IconButton onClick={addItem}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </TableContainer>

                <Button type="submit">Submit</Button>
            </Collapse>
        </Box>
    );
}

export default MaterialRequestForm;
