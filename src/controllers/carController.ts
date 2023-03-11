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
    //   const cars = await AppDataSource.getRepository(Car).find({
    //     relations: {
    //         carPhoto: true,
    //     },
    //     order: {
    //       Price: "DESC"
    //     }
    // })
    const cars = await AppDataSource.manager
    // .query(`SELECT *,"car"."id" AS "car_id" FROM "car" LEFT JOIN "car_photo" ON "carPhotoId"="car_photo"."id"`)
      .query(`SELECT
      "car"."id" AS "Car_id",
      "car"."Name" AS "Car_Name",
      "car"."Brand" AS "Car_Brand",
      "car"."Model" AS "Car_Model",
      "car"."Price" AS "Car_Price",
      "car"."Alt" AS "Car_Alt",
      "car"."Description" AS "Car_Description",
      "car"."carPhotoId" AS "Car_carPhotoId",
      "car_photo"."Url" AS "Car_Photo_Url",
      "car_photo"."Name" AS "Car_Photo_Name",
      "car_photo"."Key" AS "Car_Photo_key",
      "car_photo"."id" AS "Car_Photo_Id"
      FROM "car" LEFT JOIN "car_photo" ON "carPhotoId"="car_photo"."id"`)
 
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
      const {Name, Brand, Model, Price, Description, Alt} = req.body

      if(!id) return res.status(400).json({error:"Carro nao informado"})

      const car = await AppDataSource.getRepository(Car).findOneBy({id})
      if(!car) return res.status(400).json({error:"Carro não encontrado"})
      if(Name){
        car.Name = Name
      }
      if(Brand){
        car.Brand = Brand
      }
      if(Description){
        car.Description = Description
      }
      if(Model){
        car.Model = Model
      }
      if(Price){
        car.Price = Price
      }
      if(Alt){
        car.Alt = Alt
      }

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
      .query(`SELECT
      "car"."id" AS "Car_id",
      "car"."Name" AS "Car_Name",
      "car"."Brand" AS "Car_Brand",
      "car"."Model" AS "Car_Model",
      "car"."Price" AS "Car_Price",
      "car"."Description" AS "Car_Description",
      "car"."Alt" AS "Car_Alt",
      "car"."carPhotoId" AS "Car_carPhotoId",
      "car_photo"."Url" AS "Car_Photo_Url",
      "car_photo"."Name" AS "Car_Photo_Name",
      "car_photo"."Key" AS "Car_Photo_key",
      "car_photo"."id" AS "Car_Photo_Id"
      FROM "car" LEFT JOIN "car_photo" ON "car_photo"."id"="carPhotoId" WHERE "car"."Name" LIKE '%${search}%' 
      OR "car"."Brand" LIKE '%${search}%' OR "car"."Model" LIKE '%${search}%'`)
      return res.status(200).json(cars)
    },

}