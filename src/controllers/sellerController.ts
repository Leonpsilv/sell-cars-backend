import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Seller } from "../entity/Seller";
import { errorConvert } from "../core/error";

export const sellerController = {
  async newSeller(req: Request, res: Response) {
    const { name, email, tel } = req.body;
    const sellerDto = {
      name,
      email,
      tel,
    };
    const seller = AppDataSource.getRepository(Seller).create(sellerDto);
    const results = await AppDataSource.getRepository(Seller)
      .save(seller)
      .catch((e) => {
        errorConvert(res, 400, `Falha ao salvar dados do vendedor`, e);
      });
    return res.status(200).json(results);
  },
  //   async getAllSellers(req: Request, res: Response) {},
  async getSellerById(req: Request, res: Response) {
    const id = Number(req.params.sellerId);
    const seller = await AppDataSource.getRepository(Seller).findOneBy({id});
    if (seller) return res.status(200).json(seller);
    errorConvert(res, 400, "vendedor não encontrado!");
  },
  async editSeller(req: Request, res: Response) {},
  async deleteSeller(req: Request, res: Response) {},
};
