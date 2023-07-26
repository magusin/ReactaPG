/* eslint-disable react/no-unescaped-entities */
'use client'
// react
import React, { useContext, useEffect, useState } from 'react'
// mui
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  CircularProgress,
  Grid,
  Button
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// next
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// types
import { Player } from 'src/types/Player'
import { Fight } from 'src/types/Fight'
// assets
import logs from '#/public/logs.png'
// component
import Header from 'src/components/header'
import StatsCard from 'src/components/statsCard'
import TableNav from 'src/components/tableNav'
import LevelUpAbilitiesChoices from 'src/components/levelUpAbilitiesChoices'
import LevelUpCapacitiesChoices from 'src/components/levelUpCapacitiesChoices'
import axios from 'axios'
import xpThresholdForLevel from 'src/utils/levelFunction'
import PlayerContext from 'src/utils/PlayerContext'

export default function Home() {
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)
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
  const [open, setOpen] = useState<boolean>(false)

  // Open modal
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Close modal
  const handleClose = () => {
    setOpen(false)
  }

  const handleLevelUp = async () => {
    if (currentPlayer) {
      try {
        const response = await axios.get(`api/user/${currentPlayer.id}/levelUp`)
        if (response.status === 200) {
          const data = response.data
          setCurrentPlayer(data)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Failed to level up:', err.message)
        } else {
          console.error('Failed to level up:', err)
        }
      }
    }
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
            setCurrentPlayer(res.data)
          })
        } catch (err) {
          console.error(err)
          router.push('/login')
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
  }, [router, setCurrentPlayer])

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
console.log('currentPlayer', currentPlayer) 
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
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {currentPlayer &&
                currentPlayer.xp >=
                  xpThresholdForLevel(currentPlayer.level + 1) &&
                !currentPlayer.levelingUp ? (
                  <Button onClick={handleLevelUp} sx={{ fontSize: '2rem' }}>
                    Level Up
                  </Button>
                ) : currentPlayer &&
                  currentPlayer.levelingUp &&
                  currentPlayer.abilityRequired ? (
                  <LevelUpAbilitiesChoices />
                ) : currentPlayer &&
                currentPlayer.levelingUp &&
                currentPlayer.capacitiesRequired && !currentPlayer.abilityRequired ? (
                <LevelUpCapacitiesChoices />
              ) : (
                  <TableNav />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <StatsCard />
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
            <DialogTitle
              sx={{ textAlign: 'center', backgroundColor: '#f2cb9a' }}
            >
              Fight Logs
            </DialogTitle>
            <DialogContent
              sx={{
                minWidth: '300px',
                maxWidth: '500px',
                overflow: 'auto',
                textAlign: 'center',
                alignItems: 'center'
              }}
            >
              {Object.entries(
                fightLogs
                  // trier par timestamp
                  .sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  // grouper par date
                  .reduce(
                    (groups: { [key: string]: typeof fightLogs }, item) => {
                      if (item && item.timestamp) {
                        const dateObj = new Date(item.timestamp)
                        const date = dateObj.toISOString().split('T')[0]

                        if (!groups[date]) {
                          groups[date] = []
                        }
                        groups[date].push(item)
                      }
                      return groups
                    }, {}
                  )
              )
                // afficher chaque groupe avec un en-tête contenant la date
                .map(([date, items], index) => (
                  <span key={index}>
                    <h4>{date}</h4>
                    {items.map((item) => (
                      <p
                        key={item.uuid}
                        style={{
                          backgroundColor:
                          currentPlayer && item.winner_id === currentPlayer.id
                              ? '#c3dfc4'
                              : '#efc7c7'
                        }}
                      >
                        <Link
                          style={{
                            textDecoration: 'none',
                            color:
                            currentPlayer && item.winner_id === currentPlayer.id
                                ? '#00853f'
                                : '#d21034'
                          }}
                          href={`/replay/${item.uuid}`}
                        >
                          {item.player1.username} vs {item.player2.username}
                        </Link>
                      </p>
                    ))}
                  </span>
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
