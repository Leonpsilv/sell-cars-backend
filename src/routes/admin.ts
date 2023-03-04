import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { carController } from "../controllers/carController";

import multer from 'multer';
import { multerConfig } from "../services/multer/multerConfig";

export const adminRoutes: Router = Router()

adminRoutes.post('/cadastrar', adminController.newUser)
adminRoutes.put('/editar/:cpf', adminController.editUser)
adminRoutes.delete('/deletar/:cpf', adminController.deleteUser)
adminRoutes.get('/usuario/:name', adminController.getUser)
adminRoutes.get('/usuario', adminController.getAllUsers)

adminRoutes.post("/carros/foto/:carId", multer(multerConfig).single("file"), carController.carPhoto);
adminRoutes.post("/carros/novo", carController.newCar);
adminRoutes.get("/carros", carController.getAllCars);
adminRoutes.get("/carros/:carId", carController.getCar);
adminRoutes.put("/carros/:carId", carController.editCar);
adminRoutes.delete("/carros/:carId", carController.deleteCar);
adminRoutes.get("/carros/pesquisa/carro", carController.getCarsBySearch);
