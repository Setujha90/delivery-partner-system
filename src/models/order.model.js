import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    orderValue: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "assigned", "picked", "delivered"],
        default: "pending",
    },
    assignedPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner",
        default: null,
    },
    createdAt: { type: Date, default: Date.now },
    pickedAt: { type: Date },        
    deliveredAt: { type: Date },    
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
