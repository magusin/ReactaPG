/* eslint-disable react/no-unescaped-entities */
'use client'
// react
import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// mui
import {
  Typography,
  Box,
  Tooltip,
  LinearProgress,
  Grid,
  Snackbar,
  IconButton,
  Button
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
// utils
import BattleOrder from 'src/utils/BattleOrder'
import CalculateDamage from 'src/utils/CalculateDamage'
import GenerateMessage from 'src/utils/GenerateMessage'
import PlayerContext from 'src/utils/PlayerContext'
import assignColor from 'src/utils/assignColor'
// img
import Image from 'next/legacy/image'
import vs from '#/public/vs.png'
// router
import { useRouter, usePathname } from 'next/navigation'
// axios
import axios from 'axios'
// component
import PlayerInfo from 'src/components/playerInfo'
import AnimatedText from 'src/components/AnimatedText'

// types
interface Letter {
  letter: string
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

// animation variants
const MotionTypography = motion(Typography)

// animated title
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } },
  exit: { opacity: 0, transition: { ease: 'easeInOut' } }
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
  const pathname = usePathname()
  const [order, setOrder] = useState<string[]>([])
  const [battleHistory, setBattleHistory] = useState<string[]>([])
  const [hpHistory, setHpHistory] = useState<
    { player1Hp: number; player2Hp: number }[]
  >([])
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
  const uuid = pathname ? pathname.split('/').pop() : ''
  // Function to open the snackbar with a specific message
  const openSnackbar = (newMessage: string) => {
    setMessage(newMessage)
    setOpen(true)
  }

  useEffect(() => {
    if (!currentPlayer || !challengingPlayer) {
      router.push('/') // Redirects user to home page
    }
    if (currentPlayer && challengingPlayer && !isBattleFinished) {
      if (!order.length) {
        setOrder(BattleOrder({ players: [currentPlayer, challengingPlayer] }))
      }
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
            openSnackbar('You win 1 XP')
          } else {
            updatePlayerXP(currentPlayer.id, currentPlayer.xp + 2)
            openSnackbar('You win 2 XP')
          }
          const saveFight = async () => {
            try {
              const response = await axios.post('/api/fight', {
                uuid: uuid,
                player1_id: currentPlayer.id,
                player2_id: challengingPlayer.id,
                winner_id:
                  currentHp1 <= 0 ? challengingPlayer.id : currentPlayer.id
              })
            } catch (err) {
              console.error(err)
            }
          }

          const saveFightEvent = async (
            message: string,
            fightId: string,
            position: number, 
            hpPlayer1: number, 
            hpPlayer2: number
          ) => {
            try {
              const response = await axios.post('/api/fightEvent', {
                fight_id: fightId,
                message: message,
                position: position,
                hpPlayer1: hpPlayer1,
                hpPlayer2: hpPlayer2
              })
            } catch (err) {
              console.error(err)
            }
          }
          // Call saveFightEvent for each message in battleHistory
          const performSaving = async () => {
            await saveFight()
            if (uuid) {
              // vérifier si uuid est défini
              for (let index = 0; index < battleHistory.length; index++) {
                const message = battleHistory[index]
                const hpData = hpHistory[index]
                await saveFightEvent(
                  message,
                  uuid,
                  index,
                  hpData.player1Hp,
                  hpData.player2Hp
                )
              }
            }
          }
          // call function
          performSaving()
        } else {
          const player = order.shift()
          if (order.length === 0) {
            setOrder(
              BattleOrder({ players: [currentPlayer, challengingPlayer] })
            )
          }
          if (player === currentPlayer.username) {
            const damage = CalculateDamage(currentPlayer, challengingPlayer)
            const newHp2 = Math.max(currentHp2 - damage, 0)
            setCurrentHp2(newHp2)
            const message = GenerateMessage(
              currentPlayer,
              challengingPlayer,
              damage
            )
            setBattleHistory((oldArray) => [...oldArray, message])
            setHpHistory((oldArray) => [
              ...oldArray,
              { player1Hp: currentHp1, player2Hp: newHp2 }
            ])
          } else {
            const damage = CalculateDamage(challengingPlayer, currentPlayer)
            const newHp1 = Math.max(currentHp1 - damage, 0)
            setCurrentHp1(newHp1)
            const message = GenerateMessage(
              challengingPlayer,
              currentPlayer,
              damage
            )
            setBattleHistory((oldArray) => [...oldArray, message])
            setHpHistory((oldArray) => [
              ...oldArray,
              { player1Hp: newHp1, player2Hp: currentHp2 }
            ])
          }
        }
        console.log('hphistory', hpHistory)
      }, 2000)

      return () => clearInterval(fightInterval) // Clean up on unmount
    }
  }, [currentPlayer, challengingPlayer, isBattleFinished, router, battleHistory, currentHp1, currentHp2, uuid, order, hpHistory])
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
            spacing={3}
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
              sx={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center",
                minHeight:"200px",
                maxHeight:"500px",
                width:"100%",
                mx:"auto",
                fontSize:"1.5rem",
              fontWeight:"normal",
              height:"100%",
              marginLeft:"10px",
              marginRight:"10px"
              }}
              
              p={2}
              
            >
              <AnimatePresence initial={false}>
                {battleHistory.map((event, index) => {
                  const parts = assignColor(
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
          {isBattleFinished && (
            <Typography
              className="boxTitleStyles"
              variant="h2"
              align="center"
              style={{
                marginBottom: '8px',
                wordBreak: 'break-all',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                style={{ marginRight: '8px' }}
                onClick={() => router.push('/')}
              >
                Go to home
              </Button>
              <Button onClick={() => router.push('/duel')}>
                Fight other player
              </Button>
            </Typography>
          )}
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
