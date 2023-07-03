/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Typography,
    Button
  } from '@mui/material'
import Header from 'src/components/header'
import axios from 'axios'
import { Player } from 'src/types/Player'

export default function Duel() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Remplacer ces endpoints par les vôtres
            const player = await axios.get('/api/user');
            console.log(player)
            setPlayers(player.data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
        
      }, []);

    return (
        <>
        <Header />
        <Container>
          <Typography variant="h4" gutterBottom>
            Choisissez votre adversaire
          </Typography>
    
          {/* {opponents.map((player) => (
            <Box key={player.id} marginBottom={2}>
              <Typography variant="h6">{player.name}</Typography>
              <Button variant="contained" color="primary">
                Duel
              </Button>
            </Box>
          ))} */}
        </Container>
        </>
      );
}