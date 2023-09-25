import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface GameDocument extends Document{
    userID: UserDocument['id'];
    boardSize: number,
    moves: number[][],
    date: string,
    result: string
}

const gameSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    boardSize: Number,
    moves: [[Number]],
    date: String,
    result: String
})

export default mongoose.model<GameDocument>('Game', gameSchema);