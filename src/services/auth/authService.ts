import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { auth } from '.'
import { AppDataSource } from '../../dataSource'
import { UserAdmin } from '../../entity/UserAdmin'

export const authService = async (req: Request| any, res: Response, next: NextFunction) => {
        try {
            if(!req || !req.headers) return res.status(401).json({error : 'Token de acesso nao definido!'})

            const authorization = String(req.headers.authorization)
            if(!authorization || authorization.length < 8) return res.status(401).json({error : 'Token de acesso nao definido!'})

            const token = authorization.substring(7)
            verify(token, auth.secret, async function(err, decoded: any) {
                if(err) return res.status(400).json({error: "Token invalido!"})
                if(!decoded) return res.status(400).json({error: "Token invalido!"})

                const id= decoded.id
                const user = await AppDataSource.getRepository(UserAdmin).findOneBy({id})
                if(user) {
                    req.userId = id
                    next()
                    return
                }
                return res.status(400).json({error: "Token invalido!"})
            })
        }catch(e) {
            return res.status(400).json({error: e})
        }
    }
