import express, { Express } from 'express'
import { config } from 'dotenv'
import { routes } from './routes'
import { AppDataSource } from './database'
import "reflect-metadata"

config()
const app: Express = express()
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(routes)

AppDataSource.initialize()
    .then(() => {
        console.log("⚡️[server]: Database initialized!")
    })
    .catch((err) => {
        console.error("⚡️[server]: Error during database initialization: ", err)
        server.close(() => console.log("⚡️[server]: Server closed!"))
    })

const server = app.listen(process.env.PORT, ()=> {
    console.log(`⚡️[server]: Server running at port: ${process.env.PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => console.log("⚡️[server]: Server closed!"))
});