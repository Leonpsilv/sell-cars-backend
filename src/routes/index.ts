import { Router } from "express";
import { publicController } from '../controllers/publicController';

export const routes: Router = Router()

routes.get('/login', publicController.login)
