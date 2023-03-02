import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { UserAdmin } from "../entity/UserAdmin";

export const publicController = {
    async login(req: Request, res: Response) {
        const {Name, Password} = req.body

        const user = await AppDataSource.getRepository(UserAdmin).findOneBy({ Name })
        if(Password !== user?.Password){
            return res.status(400).json({error: "Dados inválidos!"})
        }
        return res.status(200).json(user)
    }
}