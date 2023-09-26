import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import validate from '../middleware/ValidateSchema';
import { createUser, getUserByUsername} from '../services/Auth.service';
import { InputRegister, InputLogin, SchemaRegister } from '../dbSchema/AuthSchema';
import { signJWT } from '../utils/jwt';

const authHandler = express.Router();

authHandler.post("/register", validate(SchemaRegister), async (req: Request<{}, {}, InputRegister['body']>, res: Response) => {
    try{
        const { username, password} = req.body;
        console.log(req.body)
        const userAlreadyExists = await getUserByUsername(username);

        if (userAlreadyExists){
            return res.status(409).send("Username Exists, Do you wish to login?");
        }

        const encryptPassword = await bcrypt.hash(password, 10);

        const registerUser = await createUser({
            username,
            password: encryptPassword
        });

        const token = signJWT({ username, _id: registerUser._id});
        res.status(200).json({_id: registerUser._id, token})
    } catch(exception){
        console.log(exception);
        return res.status(500).send(exception);
    }
})

authHandler.post("/login", async (req: Request<{}, {}, InputLogin['body']>, res: Response) =>{
    try{
        const {username, password} = req.body;
        console.log(req.body);
        const user = await getUserByUsername(username);
        console.log(user);

        if( user && (await bcrypt.compare(password, user.password))){
            //token creating
            const token = signJWT({username, _id: user._id});
            return res.status(200).json({_id: user._id, token});
        }
        return res.status(400).send('Invalid Credentials');
    } catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
})

export default authHandler
