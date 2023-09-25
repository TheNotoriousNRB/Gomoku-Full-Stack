import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { LogData } from '../types'
import style from './GameLog.module.css'
import { Button } from '../components'


export default function GameLog() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const {gameId = ''} = useParams()
  const [games] = useLocalStorage<LogData[]>('games', [])
  const game = games.find(
    (g) => new Date(g.date).getTime() === parseInt(gameId)
  )

  if (!user) return <Navigate to="/login"/>
  return (
    <>
    <h1 className={style.heading}> Games Log: </h1>
    {games.map(({date, result}, index) => {
      const d = new Date(date)
      return (
        <div className={style.list} key={`game-${index}`}>
        <p className={style.title}>
          Game #{index + 1} @{d.toLocaleDateString()} - {result}
        </p>
        <button
        className={style.button}
        onClick={()=>navigate(`/gameHistory?id=${d.getTime()}`)}>
        View Game
        </button>
        </div>
      )
    })}
    <Button onClick={
      () => {
        if (games){
          navigate('/')
        } else {
          navigate('/login')
        }
      }
    }>
      Home
    </Button>
  </>
  )
}
