/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid
} from '@mui/material'
import Header from 'src/components/header'
import axios from 'axios'
import { Player } from 'src/types/Player'
import { useRouter } from 'next/navigation'
import hp from '#/public/hp.png'
import Image from 'next/legacy/image'

export default function Duel() {
  const [players, setPlayers] = useState<Player[]>([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    
    if (user != null) {
      setUser(user)
      const userId = JSON.parse(user).id

      const fetchData = async () => {
        try {
          const res = await axios.get('/api/user')
          let currentPlayer = (res.data as Player[]).filter(
            (player: Player) => player.id === userId
          )[0]
          let allPlayers = (res.data as Player[]).filter((player: Player) => player.id !== userId)
          const userLevel = currentPlayer.level
          let filteredPlayers: Player[] = []
          let currentLevel = userLevel

          while (filteredPlayers.length < 6 && currentLevel < 100) {
            // Get players of current level
            let playersOfCurrentLevel = allPlayers.filter(
              (player: Player) => player.level === currentLevel
            )
            console.log('playersOfCurrentLevel', playersOfCurrentLevel)
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
            console.log('filteredPlayers:', filteredPlayers)
            currentLevel++
          }
          console.log(filteredPlayers)
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
  }, [user, router])

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
        <Box
        className="boxTitleStyles"
        display="flex"
        flexDirection="column"
        >
        <Typography variant="h4" gutterBottom>
          Choose your opponent
        </Typography>
        <Typography variant="body1" >
          (One Duel cost 4 Actions Points)
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
                <Typography fontFamily="fantasy" variant="h6">
                  {player.username.toUpperCase()}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box position="relative" width={100} height={100}>
                    <Image
                      priority
                      src={hp.src}
                      alt="pv"
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
                </Box>{' '}
                <Typography color="brown" fontFamily="fantasy" variant="body1">
                  Strength: {player.str}
                </Typography>
                <Typography color="green" fontFamily="fantasy" variant="body1">
                  Dexterity: {player.dex}
                </Typography>
                <Button variant="contained" color="primary">
                  Duel
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}