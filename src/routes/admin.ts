import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { fileController } from "../controllers/fileController";

import multer from 'multer';
import { multerConfig } from "../services/multer/multerConfig";

export const adminRoutes: Router = Router()

adminRoutes.post('/cadastrar', adminController.newUser)
adminRoutes.put('/editar/:cpf', adminController.editUser)
adminRoutes.delete('/deletar/:cpf', adminController.deleteUser)
adminRoutes.get('/usuario/:name', adminController.getUser)
adminRoutes.get('/usuario', adminController.getAllUsers)

adminRoutes.post("/posts", multer(multerConfig).single("file"), fileController.saveFile);