import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Car } from "../entity/Car";
import { CarPhoto } from "../entity/CarPhoto";

export const carController = {
    async carPhoto (req: Request| any, res: Response) {
        const { originalname: name, key, location: url = "local" } = req.file;
        const carId = req.params.carId
        
        const photo = new CarPhoto()
        photo.Name = name
        photo.Url = url
        photo.Key = key
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
    },

    async getAllCars (req: Request, res: Response) {
      const cars = await AppDataSource.getRepository(Car).find({
        relations: {
            carPhoto: true,
        },
        order: {
          Price: "DESC"
        }
    })
      return res.status(200).json(cars)
    },

    async getCar (req: Request, res: Response) {
      const id = Number(req.params.carId)
      if(!id) return res.status(400).json({error:"Carro nao informado"})

      const car = await AppDataSource.getRepository(Car).findOne({
        relations: {
          carPhoto: true
        },
        where:{
          id
        }
      })
      if(!car) return res.status(400).json({error:"id invalido"})

      return res.status(200).json(car)
    },

    async editCar (req: Request, res: Response) {
      const id = Number(req.params.carId)
      const {Name, Brand, Model, Price, Description} = req.body

      if(!id) return res.status(400).json({error:"Carro nao informado"})

      const car = await AppDataSource.getRepository(Car).findOneBy({id})
      if(!car) return res.status(400).json({error:"Carro não encontrado"})
      car.Name = Name
      car.Brand = Brand
      car.Description = Description
      car.Model = Model
      car.Price = Price

      const result = await AppDataSource.getRepository(Car).save(car).catch(e => {
        return res.status(400).json(e)
      })

      return res.status(200).json(result)
    },

    async deleteCar (req: Request, res: Response) {
      const id = Number(req.params.carId)
      if(!id) return res.status(400).json({error:"Carro nao informado"})

      const results = AppDataSource.getRepository(Car).delete({id})

      return res.status(200).json(results)
    },

    async getCarsBySearch (req: Request, res: Response) {
      const {search} = req.params
      if(!search) return res.status(400).json({error:"Carro nao informado!!"})

      const cars = await AppDataSource.manager
      .query(`SELECT * FROM car WHERE "Name" LIKE '%${search}%' 
      OR "Brand" LIKE '%${search}%' OR "Model" LIKE '%${search}%'`)
      return res.status(200).json(cars)
    },

}