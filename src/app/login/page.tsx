/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { TextField, Button, Box, Container, Typography } from '@mui/material'
import axios from 'axios'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [log, setLog] = useState(true)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [emailTaken, setEmailTaken] = useState(false)

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email:', email)
    console.log('Password:', password)
  }

  const validationSchema = Yup.object({
    
    password: Yup.string().required('password required').min(7, 'password must contain 7 minimum'),
    username: Yup.string().required('username Required').min(6, 'username must contain 6 minimum').test('check-username', 'Username already taken', async (value) => {
      // Logique de vérification de l'existance du nom d'utilisateur
      const usernameResponse = await axios.post('http://localhost:3000/api/user/check-username', {
        username
      })
      const isUsernameTaken = usernameResponse.data.taken
      return !isUsernameTaken;
    }),
    email: Yup.string().email('Invalid email address').required('Required').test('check-email', 'Email already taken', async (value) => {
      // Logique de vérification de l'existance de l'adresse e-mail
      const emailResponse = await axios.post('http://localhost:3000/api/user/check-email', {
        email
      })
      const isEmailTaken = emailResponse.data.taken
      return !isEmailTaken;
    }),
  });

  const handleRegister = async () => {
    try {

      const isValid = await validationSchema.validate({
        username,
        email,
        password
      })

      if (isValid) {
        const response = await axios.post('http://localhost:3000/api/user', {
          username,
          email,
          password
        })
        console.log(response)
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des informations', error)
    }
  }

  return (
    <>
      {log ? (
        <Container maxWidth="xs">
          <form action="">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto',
                marginTop: '200px'
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <TextField
                label="Email"
                type="email"
                value={email}
                autoComplete="email"
                style={{}}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                style={{}}
              />
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="text" onClick={() => setLog(!log)}>
                Je n'ai pas de compte
              </Button>
            </Box>
          </form>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <form action="">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto',
                marginTop: '200px'
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                label="Username"
                type="username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                style={{}}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{}}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                style={{}}
              />
              <Button variant="contained" onClick={handleRegister}>
                Register
              </Button>
              <Button variant="text" onClick={() => setLog(!log)}>
                J'ai déjà un compte
              </Button>
            </Box>
          </form>
        </Container>
      )}
    </>
  )
}

export default Login
