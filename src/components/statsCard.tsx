
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import hp from '#/public/hp.png'
import React, { useEffect } from 'react';

const Stats = ({ player }) => {

 console.log(player)

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ flexGrow: 1, fontFamily: 'fantasy' }}
      >
        {player.username.toUpperCase()}
      </Typography>
      <Box position="relative" width={100} height={100}>
        <Image priority src={hp.src} alt="pv" layout="fill" objectFit="cover" />
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
              fontFamily: 'fantasy'
            }}
          >
            {player.hpMax}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'fantasy', fontSize: '1.5rem', color: 'brown' }}
        >
          Strength: {player.str}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'fantasy', fontSize: '1.5rem', color: 'green' }}
        >
          Dexterity: {player.dex}
        </Typography>
      </Box>
    </Box>
  )
}

export default Stats
