import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { carController } from "../controllers/carController";

import multer from "multer";
import { multerConfig } from "../services/multer/multerConfig";
import { sellerController } from "../controllers/sellerController";

export const routes: Router = Router();

routes.post("/users", adminController.newUser);
routes.put("/users", adminController.editUser);
routes.delete("/user", adminController.deleteUser);
// routes.delete('/user/:cpf', adminController.deleteUserByCpf)
routes.get("/users", adminController.getAllUsers);
routes.get("/users/:name", adminController.getUser);

routes.post("/cars", carController.newCar);
routes.post("/cars/image/:carId", multer(multerConfig).single("file"), carController.carPhoto);
routes.put("/cars/:carId", carController.editCar);
routes.delete("/cars/:carId", carController.deleteCar);

routes.post("/sellers", sellerController.newSeller);
routes.get("/sellers/:sellerId", sellerController.getSellerById);
