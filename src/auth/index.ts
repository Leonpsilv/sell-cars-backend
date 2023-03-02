import { config } from "dotenv"
config()


export const auth = {
    secret: String(process.env.JWT_SECRET),
    expires: '10h'
}