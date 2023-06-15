"use client";
import { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container maxWidth="sm" >
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
        onChange={handleEmailChange}
        style={{}}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        style={{}}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
    </Container>
  );
};

export default Login;