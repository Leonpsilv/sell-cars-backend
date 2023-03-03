import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { UserAdmin } from "../entity/UserAdmin";

import { sign } from "jsonwebtoken";
import { auth } from "../services/auth";

export const publicController = {
    async login(req: Request, res: Response) {
        const {Name, Password} = req.body

        const userData = await AppDataSource.getRepository(UserAdmin).findOneBy({ Name })
        if(Password !== userData?.Password) return res.status(400).json({error: "Dados inválidos!"})
        
        const token = sign({id : userData?.id}, auth.secret, { 
            expiresIn: auth.expires
        })

        const user = {
            Name: userData?.Name,
            Email: userData?.Email,
            Role: userData?.Role
        }

        return res.status(200).json({user, token})
    }
}