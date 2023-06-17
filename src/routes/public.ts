import { Router } from "express";

import { publicController } from "../controllers/publicController";
import { carController } from "../controllers/carController";

export const routes: Router = Router();

routes.post("/login", publicController.login);
routes.get("/cars", carController.getAllCars);
routes.get("/cars/:id", carController.getCar);
routes.get("/cars", carController.getCarsBySearch);
routes.get("/cars", carController.getCarsByPrice);
