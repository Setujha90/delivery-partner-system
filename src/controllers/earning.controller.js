// src/controllers/earning.controller.js
import Payment from "../models/payment.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getTodaysEarnings = asyncHandler(async (req, res) => {
    const partnerId = req.partner._id;
    if(!partnerId) {
        throw new ApiError(400, "Partner is not authenticated");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const payments = await Payment.find({
        partnerId,
        date: { $gte: startOfDay },
    });

    if (!payments || payments.length === 0) {
        return new ApiResponse(200, "No earnings found for today", { totalEarnings: 0, payments: [] }).send(res);
    }

    const totalEarnings = payments.reduce((sum, p) => sum + p.totalAmount, 0);

    return new ApiResponse(200, "Today's earnings fetched", { totalEarnings, payments }).send(res);
});

export const getEarningHistory = asyncHandler(async (req, res) => {
    const partnerId = req.partner._id;
    if(!partnerId) {
        throw new ApiError(400, "Partner is not authenticated");
    }
    const payments = await Payment.find({ partnerId }).sort({ date: -1 });
    if (!payments || payments.length === 0) {
        return new ApiResponse(200, "No earning history found", []).send(res);
    }

    return new ApiResponse(200, "Earning history fetched", payments).send(res);
});
