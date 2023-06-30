/* eslint-disable react/no-unescaped-entities */
'use client'
import { Box, Container, Typography, useMediaQuery, Link, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import Header from 'src/components/header'
import { UserLogin } from 'src/utils'
import { useEffect, useState } from 'react'
import TableNav from 'src/components/tableNav';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const isLoggedIn = UserLogin()
  const handleConnectClick = () => {
    router.push('/login')
  }
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return ( 
    <>
      {isLoggedIn ? (
        <>
        <Header />
        <TableNav />
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
                width: '100%',
                margin: '0 auto'
              }}
            >
              <Typography component="p">
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
