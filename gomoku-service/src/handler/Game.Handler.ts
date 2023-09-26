import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import validate from '../middleware/ValidateSchema';
import { GetGameByIDSchema, CreateGameSchema, UpdateGameSchema, DeleteGameSchema } from '../dbSchema/GameSchema';
import { createGame, updateGame, deleteGame, getGameByID, getGameByUserID } from '../services/Game.Service';
import { DeserializeUser } from '../middleware/DeserializeUser';

const gameHandler = express.Router();
gameHandler.use(DeserializeUser);

gameHandler.get("/", async(req: Request, res: Response)=>{
    const userID = req.userId;
    const games = await getGameByUserID(userID);
    if (!games) return res.sendStatus(400);
    return res.status(200).json(games);
});

gameHandler.get("/:id", validate(GetGameByIDSchema), async(req: Request, res: Response)=>{
    const gameID = req.params.id;
    const userID = req.userId;
    const game = await getGameByID(gameID);
    if(!game) return res.sendStatus(404);
    return res.status(200).json({...game});
})

gameHandler.post("/", validate(CreateGameSchema), async(req: Request, res:Response)=>{
    const userID = req.userId;
    const game = req.body;
    const newGame = await createGame({...game, userID});
    return res.status(200).send(newGame);
})

gameHandler.put("/:id", validate(UpdateGameSchema), async(req:Request, res:Response)=>{
    try{
        const userID = req.userId;
        const game = req.body;
        const gameID = req.params.id;
        const newGame = await updateGame(gameID, userID, {...game, userID});
        console.log(newGame);
        if(!newGame) return res.sendStatus(400);
        return res.status(200).json(newGame);
    }catch(exception){
        console.log(exception);
    }
})

gameHandler.delete("/:id", validate(DeleteGameSchema), async(req: Request, res: Response)=>{
    const gameID = req.params.id;
    const userID = req.userId;
    await deleteGame(gameID, userID);
    return res.sendStatus(200);
})

export default gameHandler;