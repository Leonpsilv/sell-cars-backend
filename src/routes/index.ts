import { Router } from "express";
import { authService } from "../services/auth/authService";
import { publicController } from '../controllers/publicController';
import { adminRoutes } from "./admin";

export const routes: Router = Router()

routes.use('/admin', authService, adminRoutes)

routes.get('/login', publicController.login)
