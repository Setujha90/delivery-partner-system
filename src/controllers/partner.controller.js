import bcrypt from 'bcryptjs';
import Partner from '../models/partner.model.js';
import generateToken from '../utils/generatetoken.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import  asyncHandler  from '../utils/asynchandler.js';
import {STATUS_CODE} from '../utils/statuscode.const.js';
import { zodValidator } from '../utils/zodValidator.js';
import { registerSchema, loginSchema, updateStatusSchema, updateLocationSchema } from '../zodschema/authschema.js';

// Partner Registration
export const registerPartner = asyncHandler(async (req, res) => {
    const { name, email, phone, password, vehicleType } = zodValidator(registerSchema, req.body);

    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, 'Partner already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const partner = await Partner.create(
        { name, email, phone, password: hashedPassword, vehicleType }
    );
    
    if(!partner) {
        throw new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, 'Failed to create partner');
    }

    return new ApiResponse(STATUS_CODE.CREATED, 'Partner registered successfully', partner).send(res);
});

// Partner Login
export const loginPartner = asyncHandler(async (req, res) => {
    const { identifier, password } = zodValidator(loginSchema, req.body);

    const partner = await Partner.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    if (!partner) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = generateToken(partner._id);
    const partnerData = partner.toObject();
    delete partnerData.password;
    return new ApiResponse(STATUS_CODE.OK, 'Login successful', { token, partner: partnerData }).send(res);
});

// Get Partner Profile
export const getPartnerProfile = asyncHandler(async (req, res) => {
    const partner = req.partner;
    if (!partner) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, 'Partner not found');
    }
    return new ApiResponse(STATUS_CODE.OK, 'Partner profile retrieved successfully', partner).send(res);
});

//Update Partner Status
export const updatePartnerStatus = asyncHandler(async (req, res) => {
    const partner = req.partner;
    if (!partner) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, 'Partner not found');
    }

    const { status } = zodValidator(updateStatusSchema, req.body);

    partner.status = status;
    await partner.save({ validateBeforeSave: false });

    return new ApiResponse(STATUS_CODE.OK, 'Partner status updated successfully', partner).send(res);
});

// Update Partner Location
export const updatePartnerLocation = asyncHandler(async (req, res) => {
    const partner = req.partner;    
    if (!partner) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, 'Partner not found');
    }

    const { latitude, longitude } = zodValidator(updateLocationSchema, req.body);
    partner.currentLocation = { latitude, longitude };
    await partner.save({ validateBeforeSave: false });

    return new ApiResponse(STATUS_CODE.OK, 'Partner location updated successfully', partner).send(res);
});