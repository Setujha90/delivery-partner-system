import { Router } from "express";
import {
    createOrder,
    getAvailableOrders,
    acceptOrder,
    updateOrderStatus,
    getMyOrders,
} from "../controllers/order.controller.js";
import { protectPartner } from '../middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post("/", createOrder); 
orderRouter.get("/available", protectPartner, getAvailableOrders);
orderRouter.post("/:id/accept", protectPartner, acceptOrder);
orderRouter.put("/:id/status", protectPartner, updateOrderStatus);
orderRouter.get("/my-orders", protectPartner, getMyOrders);

export default orderRouter;
