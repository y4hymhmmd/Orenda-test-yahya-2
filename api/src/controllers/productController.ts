import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, unit, price } = req.body;
    const newProduct = await prisma.product.create({
        data: { name, unit, price },
    });
    res.status(201).json(newProduct);
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, unit, price } = req.body;
    const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, unit, price },
    });
    res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Product deleted' });
};
