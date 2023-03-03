import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { UserAdmin } from "../entity/UserAdmin";

export const fileController = {
    async saveFile (req: Request | any, res: Response) {
        const { originalname: name, size, key, location: url = "" } = req.file;
        const post = {
          name,
          size,
          key,
          url
        }
        console.log(post)
        return
      }
}