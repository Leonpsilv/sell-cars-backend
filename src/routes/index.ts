import { Router } from "express";
import { authService } from "../services/auth/authService";
import { routes as adminRoutes } from "./admin";
import { routes as publicRoutes } from "./public";

export const router: Router = Router();

router.use(publicRoutes);
router.use("/admin", authService, adminRoutes);
