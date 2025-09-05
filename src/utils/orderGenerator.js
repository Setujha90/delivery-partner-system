import Order from "../models/order.model.js";

const customerNames = ["Vishal", "Setu", "Akash", "Pratik", "Vivek", "Amit", "Neha", "Rajesh", "Saumya", "Karan", "Sneha"];
const addresses = [
    "Patna, Bihar",
    "Gaya, Bihar",
    "Bhagalpur, Bihar",
    "Madhubani, Bihar",
    "Darbhanga, Bihar",
    "Muzaffarpur, Bihar",
    "Purnia, Bihar",
    "Ranchi, Jharkhand",
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPhone() {
    return "9" + Math.floor(100000000 + Math.random() * 900000000).toString();
}

function getRandomValue() {
    return Math.floor(Math.random() * (500 - 100 + 1)) + 100;
}

export async function generateRandomOrder() {
    const order = new Order({
        customerName: getRandomElement(customerNames),
        customerPhone: getRandomPhone(),
        pickupAddress: getRandomElement(addresses),
        deliveryAddress: getRandomElement(addresses),
        orderValue: getRandomValue(),
    });

    await order.save();
    console.log(" New random order created:", order._id);
    return order;
}
