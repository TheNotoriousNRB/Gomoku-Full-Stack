import React, { useEffect, useState } from 'react'
import { UserContext } from '../context'
import { useContext } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { LogData } from '../types'
import style from './GamesHistory.module.css'
import { GameBoard } from '../components'
import {Button} from '../components'
import { get } from '../utils/http'

export default function GamesHistory() {
  const {user} = useContext(UserContext)
  const {gameId = ''} = useParams()
  const navigate = useNavigate()
  const [gamesById, setGameById] = useState<LogData[]>([])
  const [games] = useLocalStorage<LogData[]>('games', [])
 
   
  if (!user) return <Navigate to="/login"/>

  const getGameById =async () => {
    const getGames = await get<LogData[]>('../api/games')
    setGameById(getGames)
  }

  useEffect(() => {
    getGameById()
  }, [])

  const game = gamesById.find(
    (i)=>i._id==gameId
  )
  
  if(!game)
  return(
    <div>
      <p> Select an option:</p>
    </div>
  ) 

  const {boardSize, moves, result } = game

  return (
    <>
    <p className={style.message}>{result}</p>
    <GameBoard size={boardSize} moves={moves} blocked />
    <div className={style.button}>
      <Button onClick={()=> navigate('/gameLog')}>Back</Button>
    </div>
    </>
  )
}
