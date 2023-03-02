import { Router } from "express";
import { adminController } from "../controllers/adminController";

export const adminRoutes: Router = Router()

adminRoutes.post('/cadastrar', adminController.newUser)
adminRoutes.put('/editar/:cpf', adminController.editUser)
adminRoutes.delete('/deletar/:cpf', adminController.deleteUser)
adminRoutes.get('/usuario/:name', adminController.getUser)
adminRoutes.get('/usuario', adminController.getAllUsers)
