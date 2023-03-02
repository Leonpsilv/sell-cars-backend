import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { publicController } from '../controllers/publicController';

export const routes: Router = Router()

routes.get('/login', publicController.login)
routes.post('/cadastrar', adminController.newUser) // private
