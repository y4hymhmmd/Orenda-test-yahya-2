import axios from 'axios';

const API_URL = 'http://localhost:3000/api/customers'; // ganti dengan URL backend API kamu

interface Customer {
    name: string;
    phone: string;
    email: string;
    address: string;
}

export const getCustomers = async (searchQuery = '', page = 1, limit = 10) => {
    const response = await axios.get(`${API_URL}?q=${searchQuery}&page=${page}&limit=${limit}`);
    return response.data;
};

export const createCustomer = async (customer: Customer) => {
    const response = await axios.post(API_URL, customer);
    return response.data;
};

export const updateCustomer = async (id: string, customer: Customer) => {
    const response = await axios.put(`${API_URL}/${id}`, customer);
    return response.data;
};

export const getCustomerById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

