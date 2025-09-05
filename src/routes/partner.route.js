import {Router} from 'express';
import { registerPartner, loginPartner, getPartnerProfile, updatePartnerStatus, updatePartnerLocation} from '../controllers/partner.controller.js';
import { protectPartner } from '../middlewares/auth.middleware.js';

const partnerRouter = Router();

partnerRouter.post('/register', registerPartner);
partnerRouter.post('/login', loginPartner);
partnerRouter.get('/profile', protectPartner, getPartnerProfile);
partnerRouter.put('/status', protectPartner, updatePartnerStatus);
partnerRouter.put('/location', protectPartner, updatePartnerLocation);

export default partnerRouter;
