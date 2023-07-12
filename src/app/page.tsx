/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Link,
  CircularProgress,
  Grid
} from '@mui/material'
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import Header from 'src/components/header'
import { useEffect, useState } from 'react'
import TableNav from 'src/components/tableNav'
import StatsCard from 'src/components/statsCard'
import axios from 'axios'
import { Player } from 'src/types/Player'
import { Fight } from 'src/types/Fight'
import logs from '#/public/logs.png'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fightLogs, setFightLogs] = useState<Fight[]>([])
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [user, setUser] = useState<any>(null)

  const handleConnectClick = () => {
    router.push('/login')
  }

  // Modal state
  const [open, setOpen] = useState(false)

  // Open modal
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Close modal
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    setUser(currentUser)

    if (currentUser != null) {
      const userId = JSON.parse(currentUser).id
      const fetchDataPlayer = async () => {
        try {
          // call api allPlayers
          await axios.get(`/api/user/${userId}`).then((res) => {
            setPlayer(res.data)
          })
        } catch (err) {
          console.error(err)
        }
      }
      fetchDataPlayer()
      const fetchDataFight = async () => {
        try {
          // call api allPlayers
          await axios
            .get(`/api/user/${userId}/fight`)
            .then((res) => {
              setFightLogs(res.data)
            })
            .finally(() => {
              setIsLoading(false)
            })
        } catch (err) {
          console.error(err)
        }
      }
      fetchDataFight()
    } else {
      // L'utilisateur n'est pas connecté ou vient de se déconnecter
      setPlayer(null)
      setIsLoading(false)
    }
  }, [])

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
      {user != null ? (
        <>
          <Header />
          <Container>
            <Grid
              container
              spacing={3}
              className="boxGlobalStyles"
              marginBottom="8px"
            >
              <Grid item xs={12} md={6}>
                <TableNav />
              </Grid>
              <Grid item xs={12} md={6}>
                <StatsCard player={player} />
              </Grid>
            </Grid>
            <Box display="flex" alignItems="center" width="200px">
              <Box
                position="relative"
                width="100%"
                height="100"
                onClick={handleClickOpen}
              >
                <Image
                  priority
                  src={logs.src}
                  alt="health"
                  layout="responsive"
                  objectFit="cover"
                  width={100}
                  height={100}
                />
                <Box
                  sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem',
                      marginBottom: '50px'
                    }}
                  >
                    Logs
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Combat Logs</DialogTitle>
            <DialogContent>
              {/* Ici vous pouvez mapper les logs pour les afficher dans la modale */}
              {fightLogs.map((item) => (
                <p
                  key={item.uuid}
                  style={{
                    color: item.winner_id === player.id ? 'green' : 'red'
                  }}
                >
                  {item.player1.username} vs{' '}
                  {item.player2.username}
                </p>
              ))}
            </DialogContent>
          </Dialog>
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
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1rem', md: '1rem' }
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
