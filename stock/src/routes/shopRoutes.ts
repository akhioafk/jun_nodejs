import { Router } from "express";
import { createShopController } from "../controller/shopController";

const shopRoutes = Router();

shopRoutes.post('/create', createShopController)

export default shopRoutes