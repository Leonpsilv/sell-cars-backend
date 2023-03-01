import { Request, Response } from "express";

export const publicController = {
    async login(req: Request, res: Response) {
        return res.send("<h1>Login</h1>")
    }
}