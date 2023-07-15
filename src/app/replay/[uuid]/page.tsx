/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Fight } from 'src/types/Fight'
import { usePathname, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  CircularProgress,
  Grid,
  Button
} from '@mui/material'
import PlayerInfo from 'src/components/playerInfo'
import AnimatedText from 'src/components/AnimatedText'
// img
import Image from 'next/legacy/image'
import vs from '#/public/vs.png'

export default function Replay() {
  const [fight, setFight] = useState<Fight | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const uuid = pathname ? pathname.split('/').pop() : ''
  const [replayIndex, setReplayIndex] = useState<number | null>(null)
  const [showReplay, setShowReplay] = useState<boolean>(false)

  const handleReplay = () => {
    setReplayIndex(0)
    setShowReplay(true)
  }

  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    setUser(currentUser)
    if (currentUser != null) {
      const fetchFightData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/fight/${uuid}`)
          const fightData: Fight = res.data
          setFight(fightData)
          setIsLoading(false)
        } catch (error) {
          console.error('Failed to fetch fight data:', error.message)
          setError('Failed to fetch fight data')
        } finally {
          setIsLoading(false)
        }
      }

      if (uuid) {
        fetchFightData()
      } else {
        setError('No fight found')
        setIsLoading(false)
      }
    } else {
      // L'utilisateur n'est pas connecté ou vient de se déconnecter
      setPlayer(null)
      setIsLoading(false)
    }
  }, [uuid])

  useEffect(() => {
    if (
      showReplay &&
      replayIndex !== null &&
      replayIndex < fight.events.length - 1
    ) {
      const timer = setTimeout(() => setReplayIndex(replayIndex + 1), 2000)
      return () => clearTimeout(timer)
    }
  }, [showReplay, replayIndex])

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

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <Box
          className="boxGlobalStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            height: '100px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            No fight found
          </Typography>
        </Box>
        <Box
          className="boxTitleStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '50px',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            <Button onClick={() => router.push('/')}>Go to Home</Button>
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <>
      {fight && fight.events ? (
        <Grid
        container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
              variant="h2"
              align="center"
              style={{
                marginTop: '10px',
                wordBreak: 'break-all',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
           <span style={{ color: 'blue' }}>{fight.player1.username}</span>
              <Image src={vs.src} alt="fight" width={100} height={100}></Image>
              <span style={{ color: 'red' }}>{fight.player2.username}</span>
            </Typography>

        <Grid container spacing={3} direction="row"
        justifyContent="center"
        alignItems="center"
          sx={{ flex: 1, overflow: 'auto', padding: '10px', gap: '10px' }}
            wrap="nowrap">
          <Grid item xs={12} sm={3}>
            <PlayerInfo
              player={fight.player1.username}
              hp={fight.events[replayIndex]?.hpPlayer1 || fight.player1.hp}
              hpMax={fight.player1.hpMax}
              color="blue"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Replay du combat</Typography>
            {fight.events
              .slice(0, showReplay ? replayIndex + 1 : undefined)
              .map((event, index) => (
                <Typography variant="body1" key={index}>
                  {event.message}
                </Typography>
              ))}
            {showReplay && replayIndex === fight.events.length - 1 && (
              <Typography variant="h5">
                Le gagnant est{' '}
                {fight.winner_id === fight.player1_id
                  ? fight.player1.username
                  : fight.player2.username}
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleReplay}>
              Rejouer le combat
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <PlayerInfo
              player={fight.player2.username}
              hp={fight.events[replayIndex]?.hpPlayer2 || fight.player2.hp}
              hpMax={fight.player2.hpMax}
              color="red"
            />
          </Grid>
        </Grid>
        </Grid>
      ) : (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
          }}
        >
          <Box
            className="boxGlobalStyles"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '200px',
              height: '100px',
              textAlign: 'center',
              marginBottom: '8px'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                fontFamily: 'fantasy',
                fontSize: '1.5rem',
                mx: 'auto'
              }}
            >
              No fight found
            </Typography>
          </Box>
          <Box
            className="boxTitleStyles"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '400px',
              height: '50px',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                fontFamily: 'fantasy',
                fontSize: '1.5rem',
                mx: 'auto'
              }}
            >
              <Button
                style={{ marginRight: '8px' }}
                onClick={() => router.push('/')}
              >
                Go to Home
              </Button>
            </Typography>
          </Box>
        </Container>
      )}
    </>
  )
}
