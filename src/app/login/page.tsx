/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Snackbar,
  IconButton,
  useMediaQuery
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert from '@mui/material/Alert'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Header from 'src/components/header'
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openFalse, setOpenFalse] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [log, setLog] = useState(true)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [emailTaken, setEmailTaken] = useState(false)
  const [usernameIncorrect, setUsernameIncorrect] = useState(false)
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [captchaValue, setCaptchaValue] = useState('')

  // Schéma de validation du formulaire de connexion
  const loginValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
  })

  // Schéma de validation du formulaire d'inscription
  const registerValidationSchema = Yup.object().shape({
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

  // Interface du formulaire
  interface RegisterFormInputs {
    username: string
    email: string
    password: string
  }

  interface LoginFormInputs {
    username: string
    password: string
  }

  // Hook form pour le formulaire de connexion
  const loginForm = useForm<LoginFormInputs>({
    resolver: yupResolver(loginValidationSchema)
  })

  // Hook form pour le formulaire d'inscription
  const registerForm = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerValidationSchema)
  })

  // Fonction de soumission du formulaire d'inscription
  const handleRegister = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post('api/user', {
        username,
        email,
        password
      })

      setUsernameTaken(response.data.usernameTaken)
      setEmailTaken(response.data.emailTaken)
      // Si le nom d'utilisateur et l'email ne sont pas déjà pris, valide le formulaire
      if (!response.data.usernameTaken && !response.data.emailTaken) {
        const isValid = await registerForm.trigger()
        // Si valide, affiche une alerte
        if (isValid) {
          setOpen(true)
          setLog(!log)
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

  // Login user
  const handleLogin = async (data: LoginFormInputs) => {
    if (captchaValue !== '') {
    try {
      const response = await axios.post('api/user/login', {
        username,
        password
      })

      setUsernameIncorrect(response.data.usernameIncorrect)
      setPasswordIncorrect(response.data.passwordIncorrect)
      // Si le nom d'utilisateur et le mot de passe sont corrects, valide le formulaire
      if (
        !response.data.usernameIncorrect &&
        !response.data.passwordIncorrect
      ) {
        const isValid = await loginForm.trigger()
        // Si valide, affiche une alerte et redirige l'utilisateur vers la page d'accueil
        if (isValid) {
          setOpenLogin(true)
          // Stocke les informations de l'utilisateur dans le localStorage
          const { id, username } = response.data
          const userData = { id, username }
          localStorage.clear()
          localStorage.setItem('user', JSON.stringify(userData))
          router.push('/')
        }
      }
    } catch (error: any) {
      console.error(error)

      if (error.response && error.response.status === 401) {
        setUsernameIncorrect(error.response.data.usernameIncorrect)
        setPasswordIncorrect(error.response.data.passwordIncorrect)
      }
    }
  } else{
    setOpenFalse(true)
  }
  }

  return (
    <>
      <Header />

      {log ? (
        <Container maxWidth={isMobile ? 'xs' : 'md'}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)}>
            <Box
              className="boxGlobalStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto'
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <TextField
                label="Username"
                type="text"
                value={username}
                autoComplete="username"
                {...loginForm.register('username')}
                onChange={(e) => setUsername(e.target.value)}
                error={
                  usernameIncorrect ||
                  Boolean(loginForm.formState.errors.username)
                }
                helperText={
                  usernameIncorrect
                    ? 'Username incorrect'
                    : loginForm.formState.errors.username?.message || ''
                }
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                {...loginForm.register('password')}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={
                  passwordIncorrect ||
                  Boolean(loginForm.formState.errors.password)
                }
                helperText={
                  passwordIncorrect
                    ? 'Password incorrect'
                    : loginForm.formState.errors.password?.message || ''
                }
              />
              <ReCAPTCHA
                sitekey="6LfWD3UmAAAAAPWY2TwheHMotBLzS9SCPSNujjsC"
                onChange={(value) => setCaptchaValue(value)}
              />
              <Button variant="contained" type="submit">
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
          <form onSubmit={registerForm.handleSubmit(handleRegister)}>
            <Box
              className="boxGlobalStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                margin: '0 auto'
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                label="Username"
                type="text"
                value={username}
                {...registerForm.register('username')}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                error={
                  usernameTaken ||
                  Boolean(registerForm.formState.errors.username)
                }
                helperText={
                  usernameTaken
                    ? 'Username already taken'
                    : registerForm.formState.errors.username?.message || ''
                }
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                {...registerForm.register('email')}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={
                  emailTaken || Boolean(registerForm.formState.errors.email)
                }
                helperText={
                  emailTaken
                    ? 'Email already taken'
                    : registerForm.formState.errors.email?.message || ''
                }
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                {...registerForm.register('password')}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(registerForm.formState.errors.password)}
                helperText={
                  registerForm.formState.errors.password?.message || ''
                }
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false)
        }}
      >
        <MuiAlert
          severity="success"
          elevation={6}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Registration successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openLogin}
        autoHideDuration={6000}
        onClose={() => {
          setOpenLogin(false)
        }}
      >
        <MuiAlert
          severity="success"
          elevation={6}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenLogin(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Login complete
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openFalse}
        autoHideDuration={6000}
        onClose={() => {
          setOpenFalse(false)
        }}
      >
      <MuiAlert
          severity="error"
          elevation={6}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenFalse(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Complete the captcha please
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default Login
