import express from 'express';
import { getAllCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from '../controllers/customerController';
const router = express.Router();

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
