'use client'
import PlayerContext from 'src/utils/PlayerContext'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography, Box, Tooltip, LinearProgress } from '@mui/material'
import BattleOrder from 'src/utils/BattleOrder'
import CalculateDamage from 'src/utils/CalculateDamage'
import GenerateMessage from 'src/utils/GenerateMessage'
import { createTheme, ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Change this to any color you want
    },
  },
});

// types
interface Letter {
  letter: string
  color: string
}

interface AnimatedTextProps {
  letters: Letter[]
}

// animation variants
const MotionTypography = motion(Typography)

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

  const parts = text.split(new RegExp(`(${username1}|${username2}|\\[\\d+\\])`))
  return parts.map((part) => {
    if (part === username1) {
      return { text: part, color: 'blue' }
    } else if (part === username2) {
      return { text: part, color: 'red' }
    } else if (part.startsWith('[') && part.endsWith(']')) {
      return { text: part.slice(1, -1), color: 'brown' }
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

  const [battleHistory, setBattleHistory] = useState([])
  const [currentHp1, setCurrentHp1] = useState<int>(currentPlayer.hpMax)
  const [currentHp2, setCurrentHp2] = useState<int>(challengingPlayer.hpMax)
  const [isBattleFinished, setIsBattleFinished] = useState<boolean>(false)
  const lastMessageRef = useRef<any>(null)

  useEffect(() => {
    if (currentPlayer && challengingPlayer && !isBattleFinished) {
      const order = BattleOrder({ players: [currentPlayer, challengingPlayer] })

      let currentHp1 = currentPlayer.hpMax
      let currentHp2 = challengingPlayer.hpMax

      const fightInterval = setInterval(() => {
        if (currentHp1 <= 0 || currentHp2 <= 0) {
          // The battle is over, display the result only once
          const result =
            currentHp1 <= 0
              ? `${currentPlayer.username} a perdu`
              : `${currentPlayer.username} a gagné`
          setBattleHistory((oldArray) => [...oldArray, result])
          setIsBattleFinished(true)
          clearInterval(fightInterval)
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
  }, [currentPlayer, challengingPlayer, isBattleFinished])
  // Scroll to bottom of the hystoric
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [battleHistory])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box position="fixed" left={16} display="flex" flexDirection="column">
        <Typography variant="h2" color="blue">
          {`${currentPlayer.username.toUpperCase()}`}
        </Typography>
        <Tooltip title={`${currentHp1} / ${currentPlayer.hpMax} Health`}>
          <div>
        <ThemeProvider theme={theme}>
          <LinearProgress
            variant="determinate"
            value={(currentHp1 / currentPlayer.hpMax) * 100} // calculate percentage
            color="primary"
            style={{ height: '10px', marginTop: '20px', borderStyle: 'solid' }}
          />
          </ThemeProvider>
          </div>
        </Tooltip>
      </Box>
      <Box position="fixed" right={16}>
        <Typography variant="h2" color="red">
          {`${challengingPlayer.username.toUpperCase()}`}
        </Typography>
        <Tooltip title={`${currentHp2} / ${challengingPlayer.hpMax} Health`}>
  <div>
    <ThemeProvider theme={theme}>
      <LinearProgress
        variant="determinate"
        value={(currentHp2 / challengingPlayer.hpMax) * 100} // calculate percentage
        color="primary"
        style={{ height: '10px', marginTop: '20px', borderStyle: 'solid' }}
      />
    </ThemeProvider>
  </div>
</Tooltip>
      </Box>
      <Box
        className="boxHistoryFightStyles"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="500px"
        maxHeight="500px"
        width="50%"
        mx="auto"
        bgcolor="white"
        p={2}
        fontSize="1.5rem"
        fontWeight="normal"
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
                ref={index === battleHistory.length - 1 ? lastMessageRef : null}
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
      </Box>
    </Box>
  )
}
