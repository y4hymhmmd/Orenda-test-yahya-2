import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import { getCustomerById, createCustomer, updateCustomer } from '../services/customerService';
import { useParams, useNavigate } from 'react-router-dom';

interface CustomerFormProps {
    isEdit?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isEdit }) => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (isEdit && id) {
            const fetchCustomer = async () => {
                const data = await getCustomerById(id);
                setCustomer(data);
            };
            fetchCustomer();
        }
    }, [id, isEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && id) {
            await updateCustomer(id, customer);
        } else {
            await createCustomer(customer);
        }
        navigate('/', { replace: true });
    };

    return (
        <Paper>
            <Box p={3}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Customer Name"
                        name="name"
                        value={customer.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email Address"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit">
                            {isEdit ? 'Update Customer' : 'Create New'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/')} style={{ marginLeft: 10 }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Paper>
    );
};

export default CustomerForm;
