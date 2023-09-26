import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { LogData } from '../types'
import style from './GameLog.module.css'
import { Button } from '../components'
import { get } from '../utils/http'
import { GAMESTATE } from '../constants/constants'


export default function GameLog() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const {gameId = ''} = useParams()
  const [gamesById, setGameById] = useState<LogData[]>([])
  const [games] = useLocalStorage<LogData[]>('games', [])

  

  const getGameById = async()=>{
    const getGame = await get<LogData[]>('../api/games')
    const filteredGames = getGame.filter(game=>game.result == GAMESTATE.PLAYER_ONE_WIN || game.result == GAMESTATE.PLAYER_TWO_WIN || game.result == GAMESTATE.DRAW)
    setGameById(filteredGames)
  }

  useEffect(() => {
    getGameById()
    }, [])

  if (!user) return <Navigate to="/login"/>

  return (
    <>
    <h1 className={style.heading}> Games Log: </h1>
    {gamesById.map((game, index) => {
      const d = new Date(game.date)
      console.log(game)
      return (
        <div className={style.list} key={`game-${index}`}>
        <p className={style.title}>
          Game #{index + 1} @{d.toLocaleDateString()} - {game.result}
        </p>
        <button
        className={style.button}
        onClick={()=>navigate(`/gameHistory/${game._id}`)}>
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
