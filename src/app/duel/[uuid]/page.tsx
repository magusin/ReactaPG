'use client'
import PlayerContext from 'src/PlayerContext';
import React, { useContext } from 'react'
import { motion } from "framer-motion";
import { Typography } from '@mui/material';

const MotionTypography = motion(Typography);

export default function DuelFight() {
    const { currentPlayer, setCurrentPlayer, challengingPlayer, setChallengingPlayer } = useContext(PlayerContext);
    
    const item = {
      hidden: { opacity: 0 },
      show: { opacity: 1 }
    }
  
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
    );
  }