import jwt from 'jsonwebtoken';
import Partner from '../models/partner.model.js';
import asyncHandler from '../utils/asynchandler.js';
import ApiError from '../utils/ApiError.js';
import { STATUS_CODE } from '../utils/statuscode.const.js';


export const protectPartner = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });


    const token = header.split(' ')[1];
    if (!token) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized request");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const partner = await Partner.findById(decoded.id).select('-password');
        if (!partner) throw new ApiError(STATUS_CODE.UNAUTHORIZED, 'Invalid token');
        req.partner = partner;
        next();
    } catch (err) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, 'Token invalid or expired');
    }
});