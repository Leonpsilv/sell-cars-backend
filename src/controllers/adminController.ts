import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { UserAdmin } from "../entity/UserAdmin";

export const adminController = {
    async newUser (req: Request, res: Response) {
        const user = await AppDataSource.getRepository(UserAdmin).create(req.body)
        const results = await AppDataSource.getRepository(UserAdmin).save(user).catch(e => {
            return res.status(400).json({error: e})
        })
        return res.status(200).json(results)
    }
}