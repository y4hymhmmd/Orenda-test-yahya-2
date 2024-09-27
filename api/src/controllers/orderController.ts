import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
    const { customerId, products, discount } = req.body;

    let total = 0;

    // Hitung total harga produk
    for (const product of products) {
        const foundProduct = await prisma.product.findUnique({ where: { id: product.productId } });
        if (foundProduct) {
            total += foundProduct.price * product.quantity;
        }
    }

    // Apply diskon
    const totalWithDiscount = total - discount;

    // Buat order
    const newOrder = await prisma.order.create({
        data: {
            customerId,
            discount,
            total: totalWithDiscount,
        },
    });

    // Tambah produk ke order
    for (const product of products) {
        await prisma.orderProduct.create({
            data: {
                orderId: newOrder.id,
                productId: product.productId,
                quantity: product.quantity,
            },
        });
    }

    res.status(201).json(newOrder);
};

export const getOrderDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            customer: true,
            OrderProduct: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
};
