'use client'
import PlayerContext from 'src/utils/PlayerContext'
import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography, Box } from '@mui/material'
import BattleOrder from 'src/utils/BattleOrder'
import CalculateDamage from 'src/utils/CalculateDamage'
import { Element, scroller } from 'react-scroll'

const MotionTypography = motion(Typography)

const AnimatedText = ({ text }) => {
  const letters = text.split('')
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  const transition = { duration: 0.03 }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 0.03 * index }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Box>
  )
}

export default function DuelFight() {
  const {
    currentPlayer,
    setCurrentPlayer,
    challengingPlayer,
    setChallengingPlayer
  } = useContext(PlayerContext)

  const [battleHistory, setBattleHistory] = useState([])
  const [currentHp1, setCurrentHp1] = useState(currentPlayer.hpMax)
  const [currentHp2, setCurrentHp2] = useState(challengingPlayer.hpMax)
  const [isBattleFinished, setIsBattleFinished] = useState(false)

  useEffect(() => {
    if (currentPlayer && challengingPlayer && !isBattleFinished) {
      const order = BattleOrder({ players: [currentPlayer, challengingPlayer] });
      console.log('Order:', order);
  
      let currentHp1 = currentPlayer.hpMax;
      let currentHp2 = challengingPlayer.hpMax;
      
      const fightInterval = setInterval(() => {
        if (currentHp1 <= 0 || currentHp2 <= 0) {
          // The battle is over, display the result only once
          const result =
            currentHp1 <= 0 ? `${currentPlayer.username} a perdu` : `${currentPlayer.username} a gagné`;
          setBattleHistory((oldArray) => [...oldArray, result]);
          setIsBattleFinished(true);
          clearInterval(fightInterval);
        } else {
          const player = order.shift();
          if (player === currentPlayer.username) {
            const damage = CalculateDamage(currentPlayer, challengingPlayer);
            currentHp2 = Math.max(currentHp2 - damage, 0);
            const message = `${player} attaque pour ${damage} de dégâts. Il reste ${currentHp2} PV à ${challengingPlayer.username}`;
            setBattleHistory((oldArray) => [...oldArray, message]);
            setCurrentHp2(currentHp2);
          } else {
            const damage = CalculateDamage(challengingPlayer, currentPlayer);
            currentHp1 = Math.max(currentHp1 - damage, 0);
            const message = `${player} attaque pour ${damage} de dégâts. Il reste ${currentHp1} PV à ${currentPlayer.username}`;
            setBattleHistory((oldArray) => [...oldArray, message]);
            setCurrentHp1(currentHp1);
          }
        }
      }, 2000);
      
      return () => clearInterval(fightInterval); // Clean up on unmount
    }
  }, [currentPlayer, challengingPlayer, isBattleFinished]);

  useEffect(() => {
    scroller.scrollTo(`message_${battleHistory.length - 1}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }, [battleHistory])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box position="fixed" left={16}>
        <Typography variant="h5" color="primary">
          {`${currentPlayer.username.toUpperCase()} HP: ${currentHp1}`}
        </Typography>
      </Box>
      <Box position="fixed" right={16}>
        <Typography variant="h5" color="secondary">
          {`${challengingPlayer.username.toUpperCase()} HP: ${currentHp2}`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="50%" // control the width of the battle history box
        mx="auto" // center the battle history box
      >
        <AnimatePresence initial={false}>
          {battleHistory.map((event, index) => (
            <Element name={`message_${index}`} key={index}>
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: '0.5rem' }}
              >
                <AnimatedText text={event} />
              </motion.div>
            </Element>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
