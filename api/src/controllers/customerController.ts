import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCustomers = async (req: Request, res: Response) => {
    const customers = await prisma.customer.findMany();
    res.json(customers);
};

export const createCustomer = async (req: Request, res: Response) => {
    const { name, phone, email, address } = req.body;
    const newCustomer = await prisma.customer.create({
        data: { name, phone, email, address },
    });
    res.status(201).json(newCustomer);
};

export const getCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({ where: { id: Number(id) } });
    res.json(customer);
};

export const updateCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, phone, email, address },
    });
    res.json(updatedCustomer);
};

export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.customer.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Customer deleted' });
};
