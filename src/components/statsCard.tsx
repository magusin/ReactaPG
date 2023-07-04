import { Box, Typography, Container } from '@mui/material'
import Image from 'next/legacy/image'
import hp from '#/public/hp.png'
import React, { useEffect } from 'react'
import { Player } from 'src/types/Player'

const Stats = ({ player } : {player: Player | null}) => {

  if (player === null) {
    // Render something appropriate when there is no player.
    return <div>No player</div>;
  }

  return (
    <Container sx={{ width: '100%', marginLeft: {xs:'20px', md:'50px'}, marginRight: {xs:'20px', md:'50px'}}}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ flexGrow: 1, fontFamily: 'fantasy' }}
      >
        {player.username.toUpperCase()}
      </Typography>
      <Box display="flex" alignItems="center">
        <Box position="relative" width={100} height={100}>
          <Image
            priority
            src={hp.src}
            alt="pv"
            layout="responsive"
            objectFit="cover"
            width={100}
            height={100}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              sx={{
                cursor: 'default',
                color: 'white',
                fontFamily: 'fantasy',
                fontSize: '1.5rem'
              }}
            >
              {player.hpMax}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            marginLeft: '10px',
            color: 'red',
            fontFamily: 'fantasy',
            fontSize: '1.5rem'
          }}
        >
          Health
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'fantasy',
            fontSize: '1.5rem',
            color: 'brown'
          }}
        >
          Strength : {player.str}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'fantasy',
            fontSize: '1.5rem',
            color: 'green'
          }}
        >
          Dexterity : {player.dex}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'fantasy',
            fontSize: '1.5rem',
            color: 'darkblue'
          }}
        >
          Damage : {player.dmgMin} - {player.dmgMax}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'fantasy',
            fontSize: '1.5rem',
            color: 'dark'
          }}
        >
          Action : {player.pa}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'fantasy',
            fontSize: '1.5rem',
            color: 'grey'
          }}
        >
          Initiative : {player.init}
        </Typography>
      </Box>
    </Container>
  )
}

export default Stats
