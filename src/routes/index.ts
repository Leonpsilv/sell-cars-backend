import { Router } from "express";
import { authService } from "../services/auth/authService";
import { publicController } from '../controllers/publicController';
import { adminRoutes } from "./admin";
import { carController } from "../controllers/carController";

export const routes: Router = Router()

routes.use('/admin', authService, adminRoutes)

routes.get('/login', publicController.login)
routes.get("/carros", carController.getAllCars);
routes.get("/carros/pesquisa/:search", carController.getCarsBySearch);
