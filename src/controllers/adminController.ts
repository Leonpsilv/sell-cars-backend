import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { UserAdmin } from "../entity/UserAdmin";

export const adminController = {
  async newUser(req: Request, res: Response) {
    const user = await AppDataSource.getRepository(UserAdmin).create(req.body);
    const results = await AppDataSource.getRepository(UserAdmin)
      .save(user)
      .catch((e) => {
        return res.status(400).json({ error: e });
      });
    return res.status(200).json(results);
  },

  async getUser(req: Request, res: Response) {
    const name: string = req.params.name.toString();
    if (!name) return res.status(400).json({ error: "Usuário não informado!" });

    const user = await AppDataSource.getRepository(UserAdmin).findOneBy({
      name,
    });
    if (!user)
      return res.status(400).json({ error: "Usuário não encontrado!" });

    return res.status(200).json(user);
  },

  async getAllUsers(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(UserAdmin).find();
    return res.status(200).json(users);
  },

  async editUser(req: Request, res: Response) {
    const cpf: string = req.params.cpf.toString();
    if (!cpf) return res.status(400).json({ error: "Usuário não informado!" });

    const user = await AppDataSource.getRepository(UserAdmin).findOneBy({
      cpf,
    });
    if (!user)
      return res.status(400).json({ error: "Usuário não encontrado!" });

    user.name = req.body.Name;
    user.email = req.body.Email;
    user.password = req.body.Password;
    user.role = req.body.Role;
    const results = await AppDataSource.getRepository(UserAdmin).save(user);

    return res.status(200).json(results);
  },

  async deleteUser(req: Request, res: Response) {
    const cpf: string = req.params.cpf.toString();

    const results = AppDataSource.getRepository(UserAdmin).delete({ cpf });

    return res.status(200).json(results);
  },
};
