export const validBoardSize = [6,7,8,9,10,11,12,13,14,15]

export enum STATE {
    FREE = 'FREE',
    PLAYER_ONE = 'PLAYER_ONE',
    PLAYER_TWO = 'PLAYER_TWO',
    BLOCKED = 'BLOCKED'
}

export enum GAMESTATE{
    PLAYER_ONE_TURN = "Turn: Player 1",
    PLAYER_TWO_TURN = "Turn: Player 2",
    PLAYER_ONE_WIN = "Player 1 Won the Game!",
    PLAYER_TWO_WIN = "Player 2 Won the Game!",
    DRAW = "DRAW!"
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''