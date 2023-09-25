import { Position } from "./Position"
import { GAMESTATE } from "../constants/constants"

export type LogData = {
    boardSize: number
    moves: Position[]
    date: string
    result: GAMESTATE
}