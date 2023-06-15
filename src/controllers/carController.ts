import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Car } from "../entity/Car";
import { CarPhoto } from "../entity/CarPhoto";
import { errorConvert } from "../core/error";

export const carController = {
  async carPhoto(req: Request | any, res: Response) {
    const { originalname: name, key, location: url = "local" } = req.file;
    const carId = req.params.carId;

    const photo = new CarPhoto();
    photo.name = name;
    photo.url = url;
    photo.key = key;

    await AppDataSource.manager
      .save(photo)
      .then(async (photo) => {
        const car = await AppDataSource.getRepository(Car).findOneBy({
          id: carId,
        });
        if (car) {
          car.carPhoto = photo;
          await AppDataSource.manager.save(car).then((car) => {
            return res.status(200).json(car);
          });
        }
        errorConvert(res, 400, "id inválido");
      })
      .catch((e) => {
        errorConvert(res, 400, "Falha ao salvar carro", e);
      });
  },

  async newCar(req: Request, res: Response) {
    const car = AppDataSource.getRepository(Car).create(req.body);
    const results = await AppDataSource.getRepository(Car)
      .save(car)
      .catch((e) => {
        errorConvert(res, 400, "Falha ao salvar carro", e);
      });
    return res.status(200).json(results);
  },

  async getAllCars(req: Request, res: Response) {
    const cars = await AppDataSource.manager.query(`SELECT
      "car"."id" AS "Car_id",
      "car"."name" AS "Car_Name",
      "car"."brand" AS "Car_Brand",
      "car"."model" AS "Car_Model",
      "car"."price" AS "Car_Price",
      "car"."alt" AS "Car_Alt",
      "car"."description" AS "Car_Description",
      "car"."carPhotoId" AS "Car_carPhotoId",
      "car_photo"."url" AS "Car_Photo_Url",
      "car_photo"."name" AS "Car_Photo_Name",
      "car_photo"."key" AS "Car_Photo_key",
      "car_photo"."id" AS "Car_Photo_Id"
      FROM "car" LEFT JOIN "car_photo" ON "carPhotoId"="car_photo"."id"`);

    const carsDto = cars.map((car: any) => ({
      id: car.Car_id,
      name: car.Car_Name,
      brand: car.Car_Brand,
      model: car.Car_Model,
      price: car.Car_Price,
      alt: car.Car_Alt,
      description: car.Car_Description,
      imageId: car.Car_carPhotoId,
      image: {
        url: car.Car_Photo_Url,
        name: car.Car_Photo_Name,
        key: car.Car_Photo_key,
        id: car.Car_Photo_Id,
      },
    }));

    return res.status(200).json(carsDto);
  },

  async getCar(req: Request, res: Response) {
    const id = Number(req.params.carId);
    if (!id) errorConvert(res, 400, "Carro não informado");

    const car = await AppDataSource.getRepository(Car).findOne({
      relations: {
        carPhoto: true,
      },
      where: {
        id,
      },
    });
    if (!car) errorConvert(res, 400, "id inválido");

    return res.status(200).json(car);
  },

  async editCar(req: Request, res: Response) {
    const id = Number(req.params.carId);
    const { name, brand, model, price, description, alt } = req.body;
    if (!id) errorConvert(res, 400, "Carro não informado");
    const car = await AppDataSource.getRepository(Car).findOneBy({ id });
    if (car) {
      car.name = name ? name : car.name;
      car.brand = brand ? brand : car.brand;
      car.model = model ? model : car.model;
      car.price = price ? price : car.price;
      car.description = description ? description : car.description;
      car.alt = alt ? alt : car.alt;

      const result = await AppDataSource.getRepository(Car)
        .save(car)
        .catch((e) => {
          errorConvert(res, 400, "Falha ao salvar carro", e);
        });

      return res.status(200).json(result);
    }
    errorConvert(res, 400, "Carro não encontrado!");
  },

  async deleteCar(req: Request, res: Response) {
    const id = Number(req.params.carId);
    if (!id) errorConvert(res, 400, "Carro não informado!");

    const results = AppDataSource.getRepository(Car).delete({ id });

    return res.status(200).json(results);
  },

  async getCarsBySearch(req: Request, res: Response) {
    const { search } = req.params;
    if (!search) errorConvert(res, 400, "Carro nao informado!");

    const cars = await AppDataSource.manager.query(`SELECT
        "car"."id" AS "Car_id",
        "car"."name" AS "Car_Name",
        "car"."brand" AS "Car_Brand",
        "car"."model" AS "Car_Model",
        "car"."price" AS "Car_Price",
        "car"."description" AS "Car_Description",
        "car"."alt" AS "Car_Alt",
        "car"."carPhotoId" AS "Car_carPhotoId",
        "car_photo"."url" AS "Car_Photo_Url",
        "car_photo"."name" AS "Car_Photo_Name",
        "car_photo"."key" AS "Car_Photo_key",
        "car_photo"."id" AS "Car_Photo_Id"
        FROM "car" LEFT JOIN "car_photo" ON "car_photo"."id"="carPhotoId" WHERE
        "car"."name" LIKE '%${search}%' OR
        "car"."brand" LIKE '%${search}%' OR
        "car"."model" LIKE '%${search}%' OR
        "car"."description" LIKE '%${search}%'
      `);

    const carsDto = cars.map((car: any) => ({
      id: car.Car_id,
      name: car.Car_Name,
      brand: car.Car_Brand,
      model: car.Car_Model,
      price: car.Car_Price,
      alt: car.Car_Alt,
      description: car.Car_Description,
      imageId: car.Car_carPhotoId,
      image: {
        url: car.Car_Photo_Url,
        name: car.Car_Photo_Name,
        key: car.Car_Photo_key,
        id: car.Car_Photo_Id,
      },
    }));

    return res.status(200).json(carsDto);
  },

  async getCarsByPrice(req: Request, res: Response) {
    const { price } = req.body;
    if (!price) errorConvert(res, 400, "um preço deve ser informado!");
    return res.status(200).json({ msg: "tamo aqui prc" });
  },
};
