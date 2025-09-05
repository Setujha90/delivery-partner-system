import { Router } from "express";
import { getPartnerDashboard } from "../controllers/dashboard.controller.js";
import { protectPartner } from "../middlewares/auth.middleware.js";

const dashboardRouter = Router();

dashboardRouter.get("/", protectPartner, getPartnerDashboard);

export default dashboardRouter;
