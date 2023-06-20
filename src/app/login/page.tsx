'use client'
import { useState, useEffect } from 'react'
import { TextField, Button, Box, Container } from '@mui/material'


const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
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
        <TextField
          label="Email"
          type="email"
          value={email}
         
          style={{}}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
     
          style={{}}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  )
}

export default Login
