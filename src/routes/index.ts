import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { publicController } from '../controllers/publicController';

export const routes: Router = Router()

routes.get('/login', publicController.login)

routes.post('/cadastrar', adminController.newUser) // private
routes.put('/editar/:cpf', adminController.editUser) // private
routes.delete('/deletar/:cpf', adminController.deleteUser) // private
routes.get('/usuario/:name', adminController.getUser) // private
routes.get('/usuario', adminController.getAllUsers) // private
