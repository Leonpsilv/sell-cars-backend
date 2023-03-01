import { DataSource } from "typeorm"
import {config} from 'dotenv'
config()

import { UserAdmin } from "./entity/UserAdmin"
import { fixUserColumn1677683113088 } from "./migration/1677683113088-fixUserColumn"
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
    entities: [UserAdmin],
    migrations: [fixUserColumn1677683113088]
})
