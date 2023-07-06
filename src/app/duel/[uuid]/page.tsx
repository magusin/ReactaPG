'use client'
import PlayerContext from 'src/utils/PlayerContext'
import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import BattleOrder from 'src/utils/BattleOrder'

const MotionTypography = motion(Typography)

export default function DuelFight() {
  const {
    currentPlayer,
    setCurrentPlayer,
    challengingPlayer,
    setChallengingPlayer
  } = useContext(PlayerContext)

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  useEffect(() => {
    if (currentPlayer && challengingPlayer) {
        const order = BattleOrder({ players: [currentPlayer, challengingPlayer] });
        console.log('Order:', order);
    }
  }, [currentPlayer, challengingPlayer])

  return (
    <MotionTypography
      variant="h3"
      align="center"
      variants={item}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.5 }}
    >
      {`${currentPlayer.username.toUpperCase()} VS ${challengingPlayer.username.toUpperCase()}`}
    </MotionTypography>
  )
}
