/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'
import Header from 'src/components/header'
import axios from 'axios'
import { Player } from 'src/types/Player'
import { useRouter } from 'next/navigation'

export default function Duel() {
  const [players, setPlayers] = useState<Player[]>([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user);
    if (user != null) {
      const fetchData = async () => {
        try {
          // call api allPlayers
          await axios
            .get('/api/user')
            .then((res) => {
              setPlayers(res.data)
            })
            .finally(() => {
              setIsLoading(false)
            })
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
        <Typography variant="h4" gutterBottom>
          Choisissez votre adversaire
        </Typography>

        {players.map((player) => (
          <Box key={player.id} marginBottom={2}>
            <Typography variant="h6">{player.username}</Typography>
            <Button variant="contained" color="primary">
              Duel
            </Button>
          </Box>
        ))}
      </Container>
    </>
  )
}
