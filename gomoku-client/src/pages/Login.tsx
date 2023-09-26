import React, { useState, useContext } from 'react'
import {Button, Input, Message} from '../components'
import { useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import users from '../data/users.json'
import { UserContext } from '../context'

export default function Login() {
  const {login} = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isCredentialInvalid, setIsCredentialInvalid] = useState(false)

  const handleLogin = async () => {
    const user = await login(username, password)
    if (user===true) {
      navigate('/game')
    } else {
      setIsCredentialInvalid(true)
    }
  }
  return (
    <form className={style.container}
     onSubmit={(e) => {
      e.preventDefault()
      handleLogin()
    }}>
      { isCredentialInvalid && (
      <Message variant="error" message="Invalid Username or Password"/>
      )}
      <Input 
        name="username" 
        placeholder="Enter Username" 
        value={username} 
        onChange={(e) => {
          setUsername(e.target.value)
          setIsCredentialInvalid(false)
        }} 
      />
      <Input 
        name="password" 
        placeholder="Enter Password" 
        value={password} 
        onChange={(e) => {
          setPassword(e.target.value)
          setIsCredentialInvalid(false)
        }} 
      />
      <Button type="submit">Login</Button>
    </form>
  )
}
