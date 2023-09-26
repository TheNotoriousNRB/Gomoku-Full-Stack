import React, { useState, useContext } from 'react'
import {Button, Input, Message} from '../components'
import { useNavigate } from 'react-router-dom'
import style from './SignUp.module.css'
import users from '../data/users.json'
import { UserContext } from '../context'

export default function SignUp() {
  const {register} = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isCredentialInvalid, setIsCredentialInvalid] = useState(false)

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      window.alert('Passwords do not match')
      return
    }
    const result = await register(username, password)
    if (result === true) {
      navigate('/')
    } else {
      window.alert(result)
    }
  }
  return (
    <form className={style.container}
     onSubmit={(e) => {
      e.preventDefault()
      handleSignUp()
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
        type="password" 
        value={password} 
        onChange={(e) => {
          setPassword(e.target.value)
          setIsCredentialInvalid(false)
        }} 
      />
      <Input 
        name="confirmPassword" 
        placeholder="Enter Password" 
        type="password"
        value={confirmPassword} 
        onChange={(e) => {
          setConfirmPassword(e.target.value)
          setIsCredentialInvalid(false)
        }} 
      />
      <Button type="submit">Sign Up</Button>
    </form>
  )
}
