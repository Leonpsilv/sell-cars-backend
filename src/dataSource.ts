import { DataSource } from "typeorm"
import {config} from 'dotenv'
config()

import { UserAdmin } from "./entity/UserAdmin"
import { fixUserColumn1677683113088 } from "./migration/1677683113088-fixUserColumn"
import { addUserRole1677769862111 } from "./migration/1677769862111-addUserRole"
import { Car } from "./entity/Car"
import { CarPhoto } from "./entity/CarPhoto"
import { changeCarPhotoColumnName1677793535972 } from "./migration/1677793535972-changeCarPhotoColumnName"
const DB_PORT : number = Number(process.env.DB_PORT)
const DB_TYPE : any = process.env.DB_TYPE

export const AppDataSource: DataSource = new DataSource({
    type:     DB_TYPE,
    host:     process.env.DB_HOST,
    port:     DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        UserAdmin,
        Car,
        CarPhoto
    ],
    migrations: [
        fixUserColumn1677683113088,
        addUserRole1677769862111,
        changeCarPhotoColumnName1677793535972
    ]
})
