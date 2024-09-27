import express, { Request, Response, NextFunction } from 'express';
import { createOrder, getOrderDetail } from '../controllers/orderController';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createOrder(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getOrderDetail(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;

