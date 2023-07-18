/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { FC, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Fight } from 'src/types/Fight'
import { Event } from 'src/types/FightEvents'
import { EndEvent } from 'src/types/EndEvent'
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
import assignColor from 'src/utils/assignColor'
// img
import Image from 'next/legacy/image'
import vs from '#/public/vs.png'
import { motion } from 'framer-motion'

export default function Replay() {
  const [fight, setFight] = useState<Fight | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const uuid = pathname?.split('/').pop()
  const [isReplaying, setIsReplaying] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [displayedEvents, setDisplayedEvents] = useState<(Event | EndEvent)[]>([])
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [currentHpPlayer1, setCurrentHpPlayer1] = useState<number>(0)
  const [currentHpPlayer2, setCurrentHpPlayer2] = useState<number>(0)

  const handleReplay = () => {
    setIsReplaying(true)
    if (fight && fight.events.length > 0) {
      setCurrentHpPlayer1(fight.events[0].hpPlayer1)
      setCurrentHpPlayer2(fight.events[0].hpPlayer2)
      setDisplayedEvents([fight.events[0]])
    }
    setCurrentIndex(1)
  }

  useEffect(() => {
    const fetchFightData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/fight/${uuid}`)
        const fightData: Fight = res.data
        setFight(fightData)
  
        // À la fin du combat, définissez la santé actuelle des joueurs sur la santé finale
        setCurrentHpPlayer1(fightData.events[fightData.events.length - 1].hpPlayer1)
        setCurrentHpPlayer2(fightData.events[fightData.events.length - 1].hpPlayer2)
  
        const winner = fightData.winner_id === fightData.player1_id ? fightData.player1.username : fightData.player2.username;
        setDisplayedEvents([...fightData.events, { message: `Le gagnant est ${winner}` }])
        setIsLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch fight data:', error.message)         
        } else {
          console.error('Failed to fetch fight data:', error)
        }
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
  }, [uuid])

  useEffect(() => {
    if (isReplaying && fight && currentIndex < fight.events.length) {
      const timer = setTimeout(() => {
  
        // Mettez à jour la santé des joueurs pour chaque manche
        setCurrentHpPlayer1(fight.events[currentIndex].hpPlayer1)
        setCurrentHpPlayer2(fight.events[currentIndex].hpPlayer2)
  
        setDisplayedEvents([...displayedEvents, fight.events[currentIndex]])
        setCurrentIndex(currentIndex + 1)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (isReplaying && fight && currentIndex === fight.events.length && displayedEvents[displayedEvents.length - 1].message.indexOf('Le gagnant est') === -1) {
      const winner = fight.winner_id === fight.player1_id ? fight.player1.username : fight.player2.username;
      setDisplayedEvents([...displayedEvents, { message: `Le gagnant est ${winner}` }])
    }
  }, [isReplaying, currentIndex, displayedEvents, fight?.events, fight?.winner_id, fight?.player1_id, fight?.player1.username, fight?.player2.username, fight])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedEvents])

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
            alignItems: 'center'
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

          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ flex: 1, overflow: 'auto', padding: '10px', gap: '10px' }}
            wrap="nowrap"
          >
            <Grid item xs={12} sm={3}>
              <PlayerInfo
                player={fight.player1.username}
                hp={currentHpPlayer1}
                hpMax={fight.player1.hpMax}
                color="blue"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="boxHistoryFightStyles"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minHeight: '200px',
                maxHeight: '500px',
                width: '100%',
                mx: 'auto',
                fontSize: '1.5rem',
                fontWeight: 'normal',
                height: '500px', 
                overflowY: 'scroll', 
                marginLeft: '10px',
                marginRight: '10px'
              }}
            >
              {displayedEvents.map((event, index) => {
              const isCurrentMessage = index === displayedEvents.length - 1
              const parts = assignColor(
                event.message,
                fight.player1.username,
                fight.player2.username
              )
              const letters = parts.flatMap(({ text, color }) =>
                text.split('').map((letter) => ({ letter, color }))
              )

              return (
                <motion.div
                  ref={isCurrentMessage ? lastMessageRef : null}
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginBottom: '0.5rem',
                    fontWeight: isCurrentMessage ? 'bold' : 'normal'
                  }}
                >
                  <AnimatedText letters={letters} />
                </motion.div>
              )
            })}
          </Grid>
          <Grid item xs={12} sm={3}>
              <PlayerInfo
                 player={fight.player2.username}
                 hp={currentHpPlayer2}
                 hpMax={fight.player2.hpMax}
                 color="red"
              />
            </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleReplay}>
          Rejouer le combat
        </Button>
        <Box
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
