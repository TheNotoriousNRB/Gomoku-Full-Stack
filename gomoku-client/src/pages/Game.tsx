import React from 'react'
import { UserContext } from '../context'
import { useContext, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { validBoardSize, GAMESTATE, API_HOST } from '../constants/constants'
import { Position } from '../types'
import {useLocalStorage} from '../hooks'
import { isGameTerminal } from '../utils'
import { GameBoard } from '../components'
import { LogData } from '../types'
import {Button} from '../components'
import style from './Game.module.css'
import { get, put, del} from '../utils/http'

const isGameOver = (gameState: GAMESTATE) =>[
  GAMESTATE.DRAW, 
  GAMESTATE.PLAYER_ONE_WIN, 
  GAMESTATE.PLAYER_TWO_WIN
].includes(gameState)

export default function Game() {
  const {user} = useContext(UserContext)
  const [searchParams] = useSearchParams()
  const [games, setGames] = useLocalStorage<LogData[]>('games', [])
  const navigate = useNavigate()
  const boardSize = parseInt(searchParams.get('size') || '0')
  const [gameState, setGameState] = useState(GAMESTATE.PLAYER_ONE_TURN)
  const [moves, setMoves] = useState<Position[]>([])

  if (!user) return <Navigate to="/login" replace/>
  const _id = "";
  const userID= "";

  if(!validBoardSize.includes(boardSize)){
    return <Navigate to="/" />
  }

  const updateGameState = async (move: Position) => {
    if (isGameOver(gameState)) return

    const updatedMoves = [...moves, move]

    if (isGameTerminal(boardSize, updatedMoves)){

      if(updatedMoves.length === boardSize * boardSize){
        setGameState(GAMESTATE.DRAW)
      } else if (updatedMoves.length % 2){
        setGameState(GAMESTATE.PLAYER_ONE_WIN)
      } else {
        setGameState(GAMESTATE.PLAYER_TWO_WIN)
      }

    } else {
      setGameState(
        updatedMoves.length % 2
        ? GAMESTATE.PLAYER_ONE_TURN : GAMESTATE.PLAYER_TWO_TURN
      )
    }
    setMoves(updatedMoves)
    //get request to get game details
    const getGame = await get<LogData[]>('api/games')
    const currentGame = getGame[getGame.length-1]
    const thisId = currentGame._id

    //putting request to update game
    await put(`${API_HOST}/api/games/${thisId}`,{
      userID,
      boardSize,
      moves,
      date: new Date(),
      result: gameState
    })
  }

  const restartGame = async () => {
    const answer = window.confirm('Are you sure you want to restart the game?')
    if (!isGameOver(gameState) && !answer) return
    setMoves([])
    setGameState(GAMESTATE.PLAYER_ONE_TURN)

    //get request to get game details
    const getGame = await get<LogData[]>('api/games')
    const currentGame = getGame[getGame.length-1]
    const thisId = currentGame._id

    //putting request to update game
    await put(`${API_HOST}/api/games/${thisId}`,{
      userID:user._id,
      boardSize,
      moves,
      date: new Date(),
      result: gameState
    })
  }

  const leaveGame = async () => {
    const answer = window.confirm('Are you sure you want to Leave the game?')
    if (!isGameOver(gameState) && !answer) return
    
    if (isGameOver(gameState)) {
      setGames([
        ...games,
        {_id, userId:userID, boardSize, moves, date: new Date().toString(), result: gameState},
      ])
      navigate('/gameLog')

      //get request to get game details
    const getGame = await get<LogData[]>('api/games')
    const currentGame = getGame[getGame.length-1]
    const thisId = currentGame._id

    //putting request to update game
    await put(`${API_HOST}/api/games/${thisId}`,{
      userId:user._id,
      boardSize,
      moves,
      date: new Date(),
      result: gameState
    })

    } else {
      navigate('/home')

      //get request to get game details
    const getGame = await get<LogData[]>('api/games')
    const currentGame = getGame[getGame.length-1]
    const thisId = currentGame._id

    //DELETE request to delete game if user leave game not being finished
    await del(`${API_HOST}/api/games/${thisId}`)

    }
  }

  return (
    <>
      <p className={style.message}>
        {gameState}
      </p>

      <GameBoard 
        size = {boardSize}
        updateGameStatus={updateGameState}
        moves={moves}
        blocked = {isGameOver(gameState)}
      />

      <div className={style.button}>
        <Button type="button" onClick={restartGame}>
          Restart
        </Button>

        <Button type="button" onClick={leaveGame}>
          Leave
        </Button>
      </div>
    </>
  )
}