import express, { Express } from 'express'
import { config } from 'dotenv'
import { routes } from './src/routes'
import { AppDataSource } from './src/database'
import "reflect-metadata"

config()
const app: Express = express()
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(routes)

AppDataSource.initialize()
    .then(() => {
        console.log("⚡️[server]: Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("⚡️[server]: Error during Data Source initialization", err)
    })

app.listen(process.env.PORT, ()=> {
    console.log(`⚡️[server]: Server running at port: ${process.env.PORT}`)
})