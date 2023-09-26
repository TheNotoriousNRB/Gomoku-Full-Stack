import { Position } from "./Position"
import { GAMESTATE } from "../constants/constants"

export type LogData = {
    _id:string,
    userId: string,
    boardSize: number,
    moves: Position[],
    date: string,
    result: GAMESTATE
}