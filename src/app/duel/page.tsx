/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  IconButton
} from '@mui/material'
import Header from 'src/components/header'
import axios from 'axios'
import { Player } from 'src/types/Player'
import { useRouter } from 'next/navigation'
import str from '#/public/biceps.png'
import hp from '#/public/hp.png'
import dex from '#/public/dex.png'
import speed from '#/public/speed.png'
import Image from 'next/legacy/image'
import { v4 as uuidv4 } from 'uuid'
import PlayerContext from 'src/utils/PlayerContext'
import Tooltip from '@mui/material/Tooltip'
import MuiAlert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from "react-i18next";

export default function Duel() {
  const [players, setPlayers] = useState<Player[]>([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)
  const { setCurrentPlayer, setChallengingPlayer } = useContext(PlayerContext)
  const [open, setOpen] = useState<boolean>(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    if (currentUser != null) {
      const userId = JSON.parse(currentUser).id
      const fetchData = async () => {
        try {
          const res = await axios.get('/api/user')
          let currentPlayer = (res.data as Player[]).filter(
            (player: Player) => player.id === userId
          )[0]
          setUser(currentPlayer)
          if (!currentPlayer) {
            router.push('/login')
          }
          let allPlayers = (res.data as Player[]).filter(
            (player: Player) => player.id !== userId
          )
          const userLevel = currentPlayer.level
          let filteredPlayers: Player[] = []
          let currentLevel = userLevel

          while (filteredPlayers.length < 6 && currentLevel < 100) {
            // Get players of current level
            let playersOfCurrentLevel = allPlayers.filter(
              (player: Player) => player.level === currentLevel
            )
            // Shuffle the array
            for (let i = playersOfCurrentLevel.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1))
              ;[playersOfCurrentLevel[i], playersOfCurrentLevel[j]] = [
                playersOfCurrentLevel[j],
                playersOfCurrentLevel[i]
              ]
            }

            // Add to filteredPlayers
            filteredPlayers = [
              ...filteredPlayers,
              ...playersOfCurrentLevel
            ].slice(0, 6)
            currentLevel++
          }
          setPlayers(filteredPlayers)
          setIsLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
      fetchData()
    } else {
      // Redirect to login page if user is not logged in
      router.push('/login')
    }
  }, [router])

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
      <Header />
      <Container>
        <Box className="boxTitleStyles" display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom>
            {t("Choisis ton adversaire")}
          </Typography>
          <Typography variant="body1">
            {t("(Un combat coûte 4 Points d'Actions)")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} key={player.id}>
              <Box
                key={player.id}
                marginBottom={2}
                className="boxGlobalStyles"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography fontFamily="fantasy" variant="h4">
                  {player.username.toUpperCase()}
                </Typography>
                <Typography color="teal" fontFamily="fantasy" variant="h5">
                  {t("Niveau")} : {player.level}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Tooltip title={t("Vie")} placement="top">
                    <Box position="relative" width={100} height={100}>
                      <Image
                        priority
                        src={hp.src}
                        alt="health"
                        layout="responsive"
                        objectFit="cover"
                        width={100}
                        height={100}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            cursor: 'default',
                            color: 'white',
                            fontFamily: 'fantasy',
                            fontSize: '1.5rem'
                          }}
                        >
                          {player.hpMax}
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </Box>
                <Box display="flex" flexDirection="row" marginBottom="8px" justifyContent="space-evenly" width="100%">
                <Box display="flex" alignItems="center">
                  <Tooltip title={t("Force")} placement="top">
                    <Box position="relative" width={100} height={100}>
                      <Image
                        priority
                        src={str.src}
                        alt="str"
                        layout="responsive"
                        objectFit="cover"
                        width={100}
                        height={100}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            cursor: 'default',
                            color: 'black',
                            fontFamily: 'fantasy',
                            fontSize: '1.5rem'
                          }}
                        >
                          {player.str}
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <Tooltip title={t("Dextérité")} placement="top">
                    <Box position="relative" width={100} height={100}>
                      <Image
                        priority
                        src={dex.src}
                        alt="dex"
                        layout="responsive"
                        objectFit="cover"
                        width={100}
                        height={100}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            cursor: 'default',
                            color: 'black',
                            fontFamily: 'fantasy',
                            fontSize: '1.5rem'
                          }}
                        >
                          {player.dex}
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <Tooltip title={t("Vitesse")} placement="top">
                    <Box position="relative" width={100} height={100}>
                      <Image
                        priority
                        src={speed.src}
                        alt="speed"
                        layout="responsive"
                        objectFit="cover"
                        width={100}
                        height={100}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            cursor: 'default',
                            color: 'black',
                            fontFamily: 'fantasy',
                            fontSize: '1.5rem'
                          }}
                        >
                          {player.dex}
                        </Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    if (user.pa < 4) {
                      setOpen(true)
                      return
                    }

                    // Decrement action points
                    const newPa = user.pa - 4

                    try {
                      const response = await fetch(`/api/user/${user.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ pa: newPa })
                      })

                      if (!response.ok) {
                        throw new Error(
                          `HTTP error! status: ${response.status}`
                        )
                      }

                      const updatedPlayer = await response.json()

                      const uuid = uuidv4()
                      setCurrentPlayer(user)
                      setChallengingPlayer(player)
                      router.push(`/duel/${uuid}`)
                    } catch (error) {
                      console.error(`Failed to update player PA: ${error}`)
                    }
                  }}
                >
                  {t("Combat")}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false)
        }}
      >
        <MuiAlert
          severity="warning"
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
          {t("Pas assez de Points d'Actions")}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
