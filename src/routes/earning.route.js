
import { Router } from "express";
import { getTodaysEarnings, getEarningHistory } from "../controllers/earning.controller.js";
import { protectPartner  } from '../middlewares/auth.middleware.js';

const earningRouter = Router();

earningRouter.get("/today", protectPartner, getTodaysEarnings);
earningRouter.get("/history", protectPartner, getEarningHistory);

export default earningRouter;
