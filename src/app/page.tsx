/* eslint-disable react/no-unescaped-entities */
'use client'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Link,
  CircularProgress,
  Grid
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import Header from 'src/components/header'
import { UserLogin } from 'src/utils'
import { useEffect, useState } from 'react'
import TableNav from 'src/components/tableNav'
import StatsCard from 'src/components/statsCard'
import axios from 'axios'

export default function Home() {
  const [player, setPlayer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isLoggedIn = UserLogin()
  const handleConnectClick = () => {
    router.push('/login')
  }
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // loading screen
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem('user')
      const userId = JSON.parse(user).id
      axios.get(`/api/user/${userId}`)
      .then((res) => {
        setPlayer(res.data)
      })

}})

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  
  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <Grid container spacing={3}>
            <Container>
              <Box
                className="boxGlobalStyles"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  margin: '0 auto'
                }}
              >
                <Grid item xs={12} md={6}>
                  <TableNav />
                </Grid>

                <Grid item xs={12} md={6}>
                <StatsCard player={player} />
                </Grid>
              </Box>
            </Container>
          </Grid>
        </>
      ) : (
        <>
          <Header />
          <Container maxWidth={isMobile ? 'xs' : 'md'}>
            <Box
              className="boxGlobalStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                margin: '0 auto'
              }}
            >
              <Typography variant="p"
                sx={{
                  fontSize: { xs: '1rem', sm: '1rem', md: '1rem' },
                }}
                >
                Rentre dans l'aventure, terrasse des monstres, monte en
                puissance et montre aux autres joueurs qui est le plus fort !{' '}
                <Link
                  href="/login"
                  onClick={handleConnectClick}
                  color="primary"
                >
                  Connectes-toi
                </Link>{' '}
                pour commencer à jouer !
              </Typography>
            </Box>
          </Container>
        </>
      )}
    </>
  )
}
