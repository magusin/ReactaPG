/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect } from 'react'
import { TextField, Button, Box, Container } from '@mui/material'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [log, setLog] = useState(true)

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email:', email)
    console.log('Password:', password)
  }

  const handleRegister = () => {
    // Logique d'enregistrement ici
  }

  return (
    <>
      {log ? (
        <Container maxWidth="sm">
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
            <TextField label="Email" type="email" value={email} style={{}} />
            <TextField
              label="Password"
              type="password"
              value={password}
              style={{}}
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="text" onClick={() => setLog(!log)}>Je n'ai pas de compte</Button>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="sm">
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
            <TextField label="Email" type="email" value={email} style={{}} />
            <TextField
              label="Password"
              type="password"
              value={password}
              style={{}}
            />
            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="text" onClick={() => setLog(!log)}>J'ai déjà un compte</Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default Login
