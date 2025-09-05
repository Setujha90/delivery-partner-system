import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODE } from '../utils/statuscode.const.js';

// Get partner dashboard data
export const getPartnerDashboard = asyncHandler(async (req, res) => {
    const partnerId = req.partner._id;

    if (!partnerId) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Partner is not authenticated");
    }

    const activeOrder = (await Order.findOne({
        assignedPartnerId: partnerId,
        status: { $in: ["assigned", "picked"] }
    })) || null;

    const availableOrders = (await Order.find({ status: "pending" }).limit(5)) || [];

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todaysPayments = (await Payment.find({
        partnerId,
        date: { $gte: startOfDay }
    })) || [];

    const todaysEarnings = todaysPayments.reduce((sum, p) => sum + p.totalAmount, 0);

    const todaysDeliveries = todaysPayments.length;

    return new ApiResponse(200, "Dashboard data fetched", {
        activeOrder,
        availableOrders,
        todaysEarnings,
        todaysDeliveries
    }).send(res);
});
