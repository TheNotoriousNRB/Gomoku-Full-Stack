import {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Home.module.css'
import { validBoardSize } from '../constants/constants'
import { Button } from '../components'
import { UserContext } from '../context'
import { post, setToken } from '../utils/http'

export default function Home(){
    const navigate = useNavigate()
    const [size, setSize] = useState(6)
    const {user, logout } = useContext(UserContext)

    const getAction = () => {
        if (user) {
            return <>
                <Button type="button"  onClick={async () => {
                    if (user){
                        setToken(user.token)
                    }
                    await post(`/api/games`, {
                        userID: user?._id,
                        boardSize: size,
                        moves: [[]],
                        date:"",
                        result:""
                    })
                        
                    navigate(`/game?size=${size}`)}}>
                    Start Game
                </Button>
            </>
        } else {
            return <>
                <Button type="button" onClick={() => navigate('/login')}>
                    Start Game
                </Button>
            </>
        }
    }
    return (
        <>
            <label className={style.label}>
                Select Board Size:
            </label>
            <select 
                className={style.select}
                value={size.toString()}
                onChange={(e) => setSize(parseInt(e.target.value))}
            >
            {validBoardSize.map((value) => (
                <option key={`size-${value}`} value = {value.toString()}>
                    {value}
                </option>
            ))}
            </select>

            {getAction()}
            
        </>
    )
}