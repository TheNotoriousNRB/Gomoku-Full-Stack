import mongoose, {DocumentDefinition} from 'mongoose';
import { GameDocument } from '../model/game.model';
import gameModel from '../model/game.model';

export async function getAllGames() {
    return await gameModel.find().lean();
};

export async function getGameByID(id: string){
    return await gameModel.findById(id).lean();
};

export async function getGameByUserID(userID: string){
    return await gameModel.find({userID}).lean();
};

export async function createGame(input: DocumentDefinition<GameDocument>){
    return gameModel.create(input);
};

export async function updateGame(id: string, userID: string, input: DocumentDefinition<GameDocument>){
    return gameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userID: new mongoose.Types.ObjectId(userID)
        },
        input,
        {new: true}
    )
};

export async function deleteGame(id: string, userID: string){
    return gameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userID: new mongoose.Types.ObjectId(userID)
    });
};

