import React from 'react'
import { STATE } from '../constants/constants'
import style from './Stone.module.css'

type StoneProps = {
  row: number
  column: number
  state: STATE
  id: number
  onClick: (position: [number, number]) => void
  blocked: boolean
}

export default function Stone(props: StoneProps) {
  const {id, row, column, state, onClick, blocked} = props

  const getClassNames = () => {
    const className = style.stone
    switch (state){
      case STATE.PLAYER_ONE:
        return `${className} ${style.black}`
      case STATE.PLAYER_TWO:
        return `${className} ${style.white}`
      default:
        return className
    }
  }

  const handleClick = () => {
    if (state === STATE.FREE && !blocked){
      onClick([row, column])
    }
  }

  return (
    <div className={getClassNames()} onClick={handleClick}>
        {id && blocked ? id: undefined}
    </div>
  )
}
