'use client'
// react
import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// mui
import { Typography, Box, Tooltip, LinearProgress, Grid, Snackbar, IconButton } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import { createTheme, ThemeProvider } from '@mui/system'
// utils
import BattleOrder from 'src/utils/BattleOrder'
import CalculateDamage from 'src/utils/CalculateDamage'
import GenerateMessage from 'src/utils/GenerateMessage'
import PlayerContext from 'src/utils/PlayerContext'
// img
import Image from 'next/legacy/image'
import vs from '#/public/vs.png'
// router
import { useRouter } from 'next/navigation'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000'
    }
  }
})

// types
interface Letter {
  letter: string
  color: string
}

interface AnimatedTextProps {
  letters: Letter[]
}

interface PlayerComponent {
  player: string
  hp: number
  hpMax: number
  color: string
}
// call add xp function
const updatePlayerXP = async (playerId: number, newXP: number) => {
  try {
    const response = await fetch(`/api/user/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ xp: newXP })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const updatedPlayer = await response.json()
    return updatedPlayer
  } catch (error) {
    console.error(`Failed to update player XP: ${error}`)
  }
}

// Player component
const PlayerInfo = ({ player, hp, hpMax, color }: PlayerComponent) => (
  <Box style={{ maxWidth: '100%' }}>
    <Typography
      variant="h3"
      color={color}
      style={{
        wordBreak: 'break-all',
        textAlign: 'center'
      }}
    >
      {player.toUpperCase()}
    </Typography>
    <Tooltip title={`${hp} / ${hpMax} Health`}>
      <div>
        <ThemeProvider theme={theme}>
          <LinearProgress
            variant="determinate"
            value={(hp / hpMax) * 100}
            color="primary"
            style={{
              height: '10px',
              marginTop: '20px',
              borderStyle: 'solid'
            }}
          />
        </ThemeProvider>
      </div>
    </Tooltip>
  </Box>
)

// animation variants
const MotionTypography = motion(Typography)

// animated title
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } },
  exit: { opacity: 0, transition: { ease: 'easeInOut' } }
}

// animated history
const AnimatedText = ({ letters }: AnimatedTextProps) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  const transition = { duration: 0.03 }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {letters.map(({ letter, color }, index) => (
        <motion.span
          key={index}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 0.03 * index }}
          style={{ color }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Box>
  )
}

// assign color
function splitWithUsernames(
  text: string,
  username1: string,
  username2: string
) {
  const parts = text.split(
    new RegExp(`(${username1}|${username2}|\\[\\d+\\]|{[^}]+})`, 'g')
  )
  return parts.map((part) => {
    if (part === username1) {
      return { text: part, color: 'blue' }
    } else if (part === username2) {
      return { text: part, color: 'red' }
    } else if (part.startsWith('[') && part.endsWith(']')) {
      return { text: part.slice(1, -1), color: 'brown' }
    } else if (part.startsWith('{') && part.endsWith('}')) {
      return { text: part.slice(1, -1), color: 'green' }
    } else {
      return { text: part, color: 'black' }
    }
  })
}
// DuelFight component
export default function DuelFight() {
  const {
    currentPlayer,
    setCurrentPlayer,
    challengingPlayer,
    setChallengingPlayer
  } = useContext(PlayerContext)

  const router = useRouter()
  const [battleHistory, setBattleHistory] = useState<string[]>([])
  const [currentHp1, setCurrentHp1] = useState<number>(
    currentPlayer ? currentPlayer.hpMax : 0
  )
  const [currentHp2, setCurrentHp2] = useState<number>(
    challengingPlayer ? challengingPlayer.hpMax : 0
  )
  const [isBattleFinished, setIsBattleFinished] = useState<boolean>(false)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  // Function to open the snackbar with a specific message
  const openSnackbar = (newMessage : string) => {
    setMessage(newMessage)
    setOpen(true)
  }

  useEffect(() => {
    if (currentPlayer) {
      setCurrentHp1(currentPlayer.hpMax)
    }
    if (challengingPlayer) {
      setCurrentHp2(challengingPlayer.hpMax)
    }
  }, [currentPlayer, challengingPlayer])

  useEffect(() => {
    if (!currentPlayer || !challengingPlayer) {
      router.push('/') // Redirects user to home page
    }
    if (currentPlayer && challengingPlayer && !isBattleFinished) {
      const order = BattleOrder({ players: [currentPlayer, challengingPlayer] })

      let currentHp1 = currentPlayer.hpMax
      let currentHp2 = challengingPlayer.hpMax

      const fightInterval = setInterval(() => {
        if (currentHp1 <= 0 || currentHp2 <= 0) {
          // The battle is over, display the result only once
          const result =
            currentHp1 <= 0
              ? `${challengingPlayer.username} a gagné`
              : `${currentPlayer.username} a gagné`
          setBattleHistory((oldArray) => [...oldArray, result])
          setIsBattleFinished(true)
          clearInterval(fightInterval)
          if (currentHp1 <= 0) {
            updatePlayerXP(currentPlayer.id, currentPlayer.xp + 1)
            openSnackbar("You win 1 XP");
          } else {
            updatePlayerXP(currentPlayer.id, currentPlayer.xp + 2)
            openSnackbar("You win 2 XP");
          }
        } else {
          const player = order.shift()
          if (player === currentPlayer.username) {
            const damage = CalculateDamage(currentPlayer, challengingPlayer)
            currentHp2 = Math.max(currentHp2 - damage, 0)
            const message = GenerateMessage(
              currentPlayer,
              challengingPlayer,
              damage
            )
            setBattleHistory((oldArray) => [...oldArray, message])
            setCurrentHp2(currentHp2)
          } else {
            const damage = CalculateDamage(challengingPlayer, currentPlayer)
            currentHp1 = Math.max(currentHp1 - damage, 0)
            const message = GenerateMessage(
              challengingPlayer,
              currentPlayer,
              damage
            )
            setBattleHistory((oldArray) => [...oldArray, message])
            setCurrentHp1(currentHp1)
          }
        }
      }, 2000)

      return () => clearInterval(fightInterval) // Clean up on unmount
    }
  }, [currentPlayer, challengingPlayer, isBattleFinished, router])
  // Scroll to bottom of the historic
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [battleHistory])

  return (
    <>
      {currentPlayer && challengingPlayer ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
              <span style={{ color: 'blue' }}>{currentPlayer.username}</span>
              <Image src={vs.src} alt="fight" width={100} height={100}></Image>
              <span style={{ color: 'red' }}>{challengingPlayer.username}</span>
            </Typography>
          </motion.div>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ flex: 1, overflow: 'auto', padding: '10px', gap: '10px' }}
            wrap="nowrap"
          >
            <Grid item xs={12} sm={3}>
              <PlayerInfo
                player={currentPlayer.username}
                hp={currentHp1}
                hpMax={currentPlayer.hpMax}
                color="blue"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              className="boxHistoryFightStyles"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              minHeight="200px"
              maxHeight="500px"
              width="100%"
              mx="auto"
              bgcolor="white"
              p={2}
              fontSize="1.5rem"
              fontWeight="normal"
              height="100%"
              marginLeft="10px"
              marginRight="10px"
            >
              <AnimatePresence initial={false}>
                {battleHistory.map((event, index) => {
                  const parts = splitWithUsernames(
                    event,
                    currentPlayer.username,
                    challengingPlayer.username
                  )
                  const letters = parts.flatMap(({ text, color }) =>
                    text.split('').map((letter) => ({ letter, color }))
                  )

                  return (
                    <motion.div
                      ref={
                        index === battleHistory.length - 1
                          ? lastMessageRef
                          : null
                      }
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        marginBottom: '0.5rem',
                        fontWeight:
                          index === battleHistory.length - 1 ? 'bold' : 'normal'
                      }}
                    >
                      <AnimatedText letters={letters} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </Grid>

            <Grid item xs={12} sm={3}>
              <PlayerInfo
                player={challengingPlayer.username}
                hp={currentHp2}
                hpMax={challengingPlayer.hpMax}
                color="red"
              />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false)
        }}
      >
        <MuiAlert
          severity="success"
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
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
