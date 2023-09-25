import React from 'react'
import { UserContext } from '../context'
import { useContext } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { LogData } from '../types'
import style from './GamesHistory.module.css'
import { GameBoard } from '../components'
import {Button} from '../components'

export default function GamesHistory() {
  const {user} = useContext(UserContext)
  const [searchParams] = useSearchParams()
  const id = parseInt(searchParams.get('id') || '0')
  console.log(id)
  const navigate = useNavigate()
  const [games] = useLocalStorage<LogData[]>('games', [])
  const game = games.find(
    (g) => new Date(g.date).getTime() === id
  )
  if(!game) return <Navigate to="/gameLog"/>
    
  if (!user) return <Navigate to="/login"/>

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
