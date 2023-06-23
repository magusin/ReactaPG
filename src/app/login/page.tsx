import { useState } from 'react';
import * as Yup from 'yup';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [log, setLog] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').min(7, 'Password must be at least 7 characters'),
    username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters').test('check-username', 'Username already taken', async (value) => {
      const usernameResponse = await axios.post('http://localhost:3000/api/user/check-username', {
        username: value
      });
      const isUsernameTaken = usernameResponse.data.taken;
      return !isUsernameTaken;
    }),
    email: Yup.string().email('Invalid email address').required('Email is required').test('check-email', 'Email already taken', async (value) => {
      const emailResponse = await axios.post('http://localhost:3000/api/user/check-email', {
        email: value
      });
      const isEmailTaken = emailResponse.data.taken;
      return !isEmailTaken;
    }),
  });

  const handleRegister = async () => {
    try {
      const isValid = await validationSchema.validate({
        username,
        email,
        password
      });

      if (isValid) {
        const response = await axios.post('http://localhost:3000/api/user', {
          username,
          email,
          password
        });
        console.log(response);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.inner.forEach((err) => {
          if (err.path === 'username') {
            setUsernameTaken(true);
          }
          if (err.path === 'email') {
            setEmailTaken(true);
          }
        });
      } else {
        console.error('Error during information validation', error);
      }
    }
  };

  return (
    <>
      {log ? (
        <Container maxWidth="xs">
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
              onChange={(e) => setEmail(e.target.value)}
              error={emailTaken || Boolean(validationSchema.errors.email)}
              helperText={emailTaken ? 'Email already taken' : validationSchema.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(validationSchema.errors.password)}
              helperText={validationSchema.errors.password}
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="text" onClick={() => setLog(!log)}>
              Je n'ai pas de compte
            </Button>
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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              label="Username"
              type="text"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              error={usernameTaken || Boolean(validationSchema.errors.username)}
              helperText={usernameTaken ? 'Username already taken' : validationSchema.errors.username}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailTaken || Boolean(validationSchema.errors.email)}
              helperText={emailTaken ? 'Email already taken' : validationSchema.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(validationSchema.errors.password)}
              helperText={validationSchema.errors.password}
            />
            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="text" onClick={() => setLog(!log)}>
              J'ai déjà un compte
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Login;
