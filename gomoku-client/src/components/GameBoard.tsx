import React from 'react'
import {useState, useEffect} from 'react'
import Stone from './Stone'
import style from './GameBoard.module.css'
import { Position } from '../types'
import { stonePositions } from '../utils'

type BoardProps = {
  size: number
  moves: Position[]
  updateGameStatus?: (moves: Position) => void
  blocked?: boolean
}

export default function GameBoard(props: BoardProps) {
  
  const {size, moves, updateGameStatus, blocked = false} = props

  const [currentMove, setCurrentMove] = useState<Position>()
  useEffect(() => {
    if (!updateGameStatus || !currentMove || moves.includes(currentMove)) return
    updateGameStatus(currentMove) 
    setCurrentMove(undefined)
  }, [currentMove, moves, updateGameStatus])
  return (
    <div className={style.board}>
      {Array.from({length:size}).map((_, row) => (
        <div key={`row-${row}`}
        className={style.row}
        style={{gridTemplateColumns: `repeat(${size}, 3.5rem)`}}
        >
          {Array.from({length:size}).map((_, column) => (
            <Stone 
            key = {`Stone-${row * size + column}`}
            row={row}
            column={column}
            {...stonePositions([row, column], moves)}
            onClick={setCurrentMove}
            blocked={blocked}
            />
          ))}
        </div>
      ))}
      </div>
  )
}
