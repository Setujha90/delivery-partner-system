import mongoose from 'mongoose';


const partnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vehicleType: { type: String, default: 'bike' },
    status: { type: String, enum: ['available', 'busy', 'offline'], default: 'offline' },
    currentLocation: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
    },
}, { timestamps: true });


const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;