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
      const userId = JSON.parse(user).id;
      
      const fetchData = async () => {
        try {
          const res = await axios.get('/api/user')
          let currentPlayer = res.data.filter((player) => player.id === userId)[0];
          const userLevel = currentPlayer.level;
          let allPlayers = res.data.filter((player) => player.id !== userId); // Exclude current user
          let filteredPlayers = [];
          let currentLevel = userLevel;
          console.log(currentLevel)
          while (filteredPlayers.length < 6 && currentLevel < 100) {
            // Get players of current level
            let playersOfCurrentLevel = allPlayers.filter((player) => player.level === currentLevel);
            console.log('playersOfCurrentLevel', playersOfCurrentLevel)
            // Shuffle the array
            for (let i = playersOfCurrentLevel.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [playersOfCurrentLevel[i], playersOfCurrentLevel[j]] = [playersOfCurrentLevel[j], playersOfCurrentLevel[i]];
            }
            
            // Add to filteredPlayers
            filteredPlayers = [...filteredPlayers, ...playersOfCurrentLevel].slice(0, 6);
            console.log('filteredPlayers:', filteredPlayers)
            currentLevel++;
          }
          console.log(filteredPlayers)
          setPlayers(filteredPlayers);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    } else {
      // Redirect to login page if user is not logged in
      router.push('/login');
    }
  }, [user, router]);

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
