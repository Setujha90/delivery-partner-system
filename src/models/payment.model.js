import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    baseAmount: { type: Number, default: 50 },
    bonusAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
