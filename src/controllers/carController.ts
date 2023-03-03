import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Car } from "../entity/Car";
import { CarPhoto } from "../entity/CarPhoto";

export const carController = {
    async newCarPhoto (req: Request| any, res: Response) {
        const { originalname: name, size, key, location: url = "local" } = req.file;
        const carId = req.params.carId
        
        const photo = new CarPhoto()
        photo.Name = name
        photo.Url = url
        await AppDataSource.manager.save(photo).then(async photo => {
          const car = await AppDataSource.getRepository(Car).findOneBy({id: carId})
          if(!car) return res.status(400).json({error: "id inválido"})
          car.carPhoto = photo
          await AppDataSource.manager.save(car).then(car => {
            return res.status(200).json(car)
          })

        }).catch(e => {return res.status(400).json(e)})

      },

    async newCar (req: Request, res: Response) {
      const car = AppDataSource.getRepository(Car).create(req.body)
        const results = await AppDataSource.getRepository(Car).save(car).catch(e => {
            return res.status(400).json({error: e})
        })
        return res.status(200).json(results)
    }
}