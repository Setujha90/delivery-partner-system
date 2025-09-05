import Order from "../models/order.model.js";
import Partner from "../models/partner.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODE } from '../utils/statuscode.const.js';
import { generateRandomOrder } from "../utils/orderGenerator.js";
import Payment from "../models/payment.model.js";

// Create a new order (for testing/demo purposes)
export const createOrder = asyncHandler(async (req, res) => {
    const order = await generateRandomOrder();
    return new ApiResponse(STATUS_CODE.CREATED, "Order created successfully", order).send(res);
});

// Get all available (unassigned) orders
export const getAvailableOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ status: "pending" });
    return new ApiResponse(STATUS_CODE.OK, "Available orders fetched", orders).send(res);
});

// Partner accepts an order
export const acceptOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const partnerId = req.partner._id;

    const order = await Order.findById(id);
    if (!order || order.status !== "pending") {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "Order not available");
    }

    order.status = "assigned";
    order.assignedPartnerId = partnerId;
    await order.save({ validateBeforeSave: false });

    await Partner.findByIdAndUpdate(partnerId, { status: "busy" });

    return new ApiResponse(STATUS_CODE.OK, "Order accepted", order).send(res);

});

// Update order status (picked / delivered)
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "Status is required");
    }

    if (!["picked", "delivered"].includes(status)) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid status");
    }


    const order = await Order.findById(id);
    if (!order) throw new ApiError(STATUS_CODE.NOT_FOUND, "Order not found");

    if (status === "picked") {
        order.status = "picked";
        order.pickedAt = new Date();
    }

    if (status === "delivered") {
        if (order.status !== "picked") {
            throw new ApiError(STATUS_CODE.BAD_REQUEST, "Order must be picked before it can be delivered");
        }

        order.status = "delivered";
        order.deliveredAt = new Date();

        await Partner.findByIdAndUpdate(order.assignedPartnerId, { status: "available" });

        const deliveryTime = Math.round((order.deliveredAt - order.pickedAt) / (1000 * 60));
        const baseAmount = 50;
        const bonusAmount = deliveryTime < 30 ? 10 : 0;
        const totalAmount = baseAmount + bonusAmount;

        await Payment.create({
            partnerId: order.assignedPartnerId,
            orderId: order._id,
            baseAmount,
            bonusAmount,
            totalAmount,
            deliveryTime,
        });
    }

    await order.save({ validateBeforeSave: false });
    return new ApiResponse(STATUS_CODE.OK, `Order marked as ${status}`, order).send(res);
});

// Get orders assigned to current partner
export const getMyOrders = asyncHandler(async (req, res) => {
    const partnerId = req.partner._id;
    const orders = await Order.find({ assignedPartnerId: partnerId });
    return new ApiResponse(STATUS_CODE.OK, "My orders fetched", orders).send(res);
});
