import { Request, Response, NextFunction } from 'express';
import { getUserByUserID } from '../services/Auth.service';
import {verifyJWT} from '../utils/jwt';

interface TokenBody{
    username: string;
    _id: string;
    iat: number;
    exp: number;
}

export const DeserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            return res.status(403).send("Missing Token");
        }

        const decode = verifyJWT<TokenBody> (token);

        if (!decode){
            return res.status(401).send("Invalid Token");

        }

        const user = await getUserByUserID(decode._id);
        if(!user){
            return res.status(401).send("Invalid User");
        }

        req.userId = user._id;
        next();
    } catch (exception: any){
        next(exception);
    }
}