import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import { UserContext } from '../context'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const {user, logout } = useContext(UserContext)

  const getActions = () => {
    if (user) {
      return location.pathname !=='/GameLog' ? (<>
        <button className={style.action} onClick={() => navigate('GameLog')}>Games History</button>
        <button className={style.action} onClick={() => {logout(); navigate('/')}}>Logout</button>
      </>) : (
        <>
        <button className={style.action} onClick={() => navigate('Game')}>Play Game</button>
        <button className={style.action} onClick={() => {logout(); navigate('/')}}>Logout</button>
        </>
      )
    } else {
      return location.pathname !== '/login' ? ( <>
        <button className={style.action} onClick={() => navigate('login')}>
          Login
        </button>

        <button className={style.action} onClick={() => navigate('signUp')}>
          SignUp
        </button>
        </>
        
      ): ( <>
        <button className={style.action} onClick={() => navigate('/')}>
          Home
        </button>

        <button className={style.action} onClick={() => navigate('signUp')}>
          SignUp
        </button>
        </>
      )
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/">Gomoku</Link>
        <div className={style.actions}>
          {getActions()}
        </div>
      </div>
    </header>
  )
}
