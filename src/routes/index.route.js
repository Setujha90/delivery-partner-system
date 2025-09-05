import { Router } from "express"
import partnerRouter from "./partner.route.js";
import orderRouter from './order.route.js';
import earningRouter from './earning.route.js';
import dashboardRouter from './dashboard.route.js';


const router = Router();
router.use('/partners', partnerRouter);
router.use('/orders', orderRouter);
router.use('/dashboard', dashboardRouter);
router.use('/earnings', earningRouter);


export default router;