import React, { useState, useContext, useRef, useEffect } from 'react'
import {Button, Input, Message} from '../components'
import { useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import users from '../data/users.json'
import { UserContext } from '../context'

export default function Login() {
  const {login} = useContext(UserContext)
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')


  const handleLogin = async () => {
    const user = await login(username, password)
    setError('')
    if (user===true) {
      navigate('/game')
    } else {
      setError(user)
    }
  }

  useEffect(() => {
    if(usernameInput.current){
      usernameInput.current.focus()
    }
  }, [])
  

  return (
    <form className={style.container}
     onSubmit={(e) => {
      e.preventDefault()
      handleLogin()
    }}>
      { errorMessage && (
      <Message variant="error" message="Invalid Username or Password"/>
      )}
      <Input  
      ref={usernameInput}
        name="username" 
        placeholder="Enter Username" 
        value={username} 
        onChange={(e) => {
          setUsername(e.target.value)
          setError('')
        }} 
      />
      <Input 
        name="password" 
        placeholder="Enter Password" 
        value={password} 
        onChange={(e) => {
          setPassword(e.target.value)
          setError('')
        }} 
      />
      <Button type="submit">Login</Button>
    </form>
  )
}
