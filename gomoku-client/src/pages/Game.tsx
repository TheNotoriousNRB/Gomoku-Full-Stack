import React from 'react'
import { UserContext } from '../context'
import { useContext, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { validBoardSize, GAMESTATE } from '../constants/constants'
import { Position } from '../types'
import {useLocalStorage} from '../hooks'
import { isGameTerminal } from '../utils'
import { GameBoard } from '../components'
import { LogData } from '../types'
import {Button} from '../components'
import style from './Game.module.css'

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

  if (!user) return <Navigate to="/login"/>

  if(!validBoardSize.includes(boardSize)){
    return <Navigate to="/" />
  }

  const updateGameState = (move: Position) => {
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
  }

  const restartGame = () => {
    const answer = window.confirm('Are you sure you want to restart the game?')
    if (!isGameOver(gameState) && !answer) return
    setMoves([])
    setGameState(GAMESTATE.PLAYER_ONE_TURN)
  }

  const leaveGame = () => {
    const answer = window.confirm('Are you sure you want to Leave the game?')
    if (!isGameOver(gameState) && !answer) return
    
    if (isGameOver(gameState)) {
      setGames([
        ...games,
        {boardSize, moves, date: new Date().toString(), result: gameState},
      ])
      navigate('/gameLog')
    } else {
      navigate('/home')
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
