import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination } from '@mui/material';
import { getCustomers } from '../services/customerService';

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
}

const CustomerTable: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomers(searchQuery, page + 1, rowsPerPage);
            setCustomers(data);
        };
        fetchData();
    }, [searchQuery, page, rowsPerPage]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TextField label="Search name" variant="outlined" value={searchQuery} onChange={handleSearch} />
            <TableContainer>
                <Button variant="contained" color="primary" onClick={() => navigate('/customer/new')}>
                    Add New Customer
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/customer/edit/${customer.id}`)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={customers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default CustomerTable;
