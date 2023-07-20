//react
import React, { useEffect } from 'react'
//mui
import {
  Box,
  Typography,
  Container,
  Tooltip,
  LinearProgress
} from '@mui/material'
//img
import Image from 'next/legacy/image'
import hp from '#/public/hp.png'
import str from '#/public/biceps.png'
import dex from '#/public/dex.png'
import pa from '#/public/pa.png'
import speed from '#/public/speed.png'
import damage from '#/public/damage.png'
import ini from '#/public/ini.png'
import def from '#/public/def.png'
//types
import { Player } from 'src/types/Player'
//utils
import xpThresholdForLevel from 'src/utils/levelFunction'

const Stats = ({ player }: { player: Player | null }) => {
  if (player === null) {
    // Render something appropriate when there is no player.
    return <div>No player</div>
  }

  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ flexGrow: 1, fontFamily: 'fantasy' }}
      >
        {player.username.toUpperCase()}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        color="teal"
        sx={{ flexGrow: 1, fontFamily: 'fantasy', padding: '8px' }}
      >
        Level : {player.level}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Tooltip title="Health" placement="top">
            <Box position="relative" width={100} height={100}>
              <Image
                priority
                src={hp.src}
                alt="health"
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
          </Tooltip>
        </Box>
        <Box alignItems="center" maxWidth="100%">
        <Tooltip title={`${player.xp} / ${xpThresholdForLevel(player.level +1)} XP`}>
  <LinearProgress
    variant="determinate"
    // use level function
    value={(player.xp / xpThresholdForLevel(player.level +1)) * 100} 
    color="primary"
    style={{
      borderStyle: 'solid',
      width: '100px',
      position: 'relative', 
      top: -50,
    }}
  />
</Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          <Tooltip title="Action" placement="top">
            <Box position="relative" width={100} height={100}>
              <Image
                priority
                src={pa.src}
                alt="action"
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
                    color: 'black',
                    fontFamily: 'fantasy',
                    fontSize: '1.5rem'
                  }}
                >
                  {player.pa}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        width="100%"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Strength" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={str.src}
                  alt="str"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.str}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Dexterity" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={dex.src}
                  alt="dex"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.dex}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Speed" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={speed.src}
                  alt="speed"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.dex}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Damage" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={damage.src}
                  alt="damage"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.dmgMin} - {player.dmgMax}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Defense" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={def.src}
                  alt="defense"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.def}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" padding="8px">
            <Tooltip title="Initiative" placement="top">
              <Box position="relative" width={100} height={100}>
                <Image
                  priority
                  src={ini.src}
                  alt="initiative"
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
                      color: 'black',
                      fontFamily: 'fantasy',
                      fontSize: '1.5rem'
                    }}
                  >
                    {player.init}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Stats
