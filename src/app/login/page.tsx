/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Header from '../../components/header'

const Login = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [log, setLog] = useState(true)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [emailTaken, setEmailTaken] = useState(false)

  //login user
  const handleLogin = () => {
    console.log('Email:', email)
    console.log('Password:', password)
  }
  // schéma validation du formulaire
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  })
  // interface formulaire
  interface FormInputs {
    username: string;
    email: string;
    password: string;
  }
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema)
  })
  // register user
  const handleRegister = async (data: FormInputs) => {
    try {
      const response = await axios.post('api/user', {
        username,
        email,
        password
      })

      setUsernameTaken(response.data.usernameTaken)
      setEmailTaken(response.data.emailTaken)
      // si username et email non pris, valide le formulaire
      if (!response.data.usernameTaken && !response.data.emailTaken) {
        const isValid = await validationSchema.validate({
          username,
          email,
          password
        })
        // si valide affiche alert et redirige l'utilisateur vers le login
        if (isValid) {
          setOpen(true)
          window.location.reload()
        }
      }
    } catch (error: any) {
      console.error(error)

      if (error.response && error.response.status === 409) {
        setUsernameTaken(error.response.data.usernameTaken)
        setEmailTaken(error.response.data.emailTaken)
      }
    }
  }
  // ferme l'alerte
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  return (
    <>
    <Header />

      {log ? (
        <Container maxWidth="xs">
          <form action="">
            <Box
            className="boxGlobalStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto',
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
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ''}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
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
          <form onSubmit={handleSubmit(handleRegister)}>
            <Box
            className="boxGlobalStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                label="Username"
                type="text"
                value={username}
                {...register('username')}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                error={usernameTaken || Boolean(errors.username)}
                helperText={
                  usernameTaken
                    ? 'Username already taken'
                    : errors.username?.message || ''
                }
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                {...register('email')}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={emailTaken || Boolean(errors.email)}
                helperText={
                  emailTaken
                    ? 'Email already taken'
                    : errors.email?.message || ''
                }
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                {...register('password')}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password?.message || ''}
              />
              <Button variant="contained" type="submit">
                Register
              </Button>
              <Button variant="text" onClick={() => setLog(!log)}>
                J'ai déjà un compte
              </Button>
            </Box>
          </form>
        </Container>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              
              severity="success"
              elevation={6}
              variant="filled"
            >
              Registration successful!
            </MuiAlert>
          </Snackbar>
    </>
  )
}

export default Login
