import React, { useState } from 'react'
import { Button, Box, Container, Typography } from '@mui/material'
import { Player } from 'src/types/Player'
import Image from 'next/legacy/image'
import hp from '#/public/hp.png'
import str from '#/public/biceps.png'
import dex from '#/public/dex.png'
import speed from '#/public/speed.png'

const LevelUpChoices = ({ player }: { player: Player | null }) => {
  const [selectedAbility, setSelectedAbility] = useState(null)

  const handleSelect = (ability) => {
    setSelectedAbility(ability)
  }

  const handleSubmit = () => {
    if (selectedAbility) {
    }
  }

  return (
    <Container
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      {player.ability1 && (
        <Box
          sx={{
            width: '180px',
            height: '180px',
            border: selectedAbility === player.ability1 ? '1px solid black' : 'none',
            cursor: 'pointer',
            marginBottom: 2,
            backgroundColor: selectedAbility === player.ability1 ? '#9ac3ed' : '#d9d6b6',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: '30px'
          }}
          onClick={() => handleSelect(player.ability1)}
        >
          <Typography variant="h5">{player.ability1.name}</Typography>
          {player.ability1.strengthIncrease > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                margin: '8px'
              }}
            >
              <Image
                priority
                src={str.src}
                alt="strong"
                width={50}
                height={50}
              />
              <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability1.strengthIncrease}`}</Typography>
            </Box>
          )}
          {player.ability1.agilityIncrease > 0 && (
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '8px'
            }}
            >
              <Image
                priority
                src={dex.src}
                alt="dexterity"
                width={50}
                height={50}
              />
              <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability1.agilityIncrease}`}</Typography>
            </Box>
          )}
          {player.ability1.healthIncrease > 0 && (
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '8px'
            }}
            >
              <Image
                priority
                src={hp.src}
                alt="health"
                width={50}
                height={50}
              />
              <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability1.healthIncrease}`}</Typography>
            </Box>
          )}
          {player.ability1.speedIncrease > 0 && (
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '8px'
            }}
            >
              <Image
                priority
                src={speed.src}
                alt="speed"
                width={50}
                height={50}
              />
              <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability1.speedIncrease}`}</Typography>
            </Box>
          )}
        </Box>
      )}
      {player.ability2 && (
        <Box
        sx={{
          width: '180px',
          height: '180px',
          border: selectedAbility === player.ability2 ? '1px solid black' : 'none',
          cursor: 'pointer',
          marginBottom: 2,
          backgroundColor: selectedAbility === player.ability2 ? '#9ac3ed' : '#d9d6b6',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          borderRadius: '30px'
        }}
        onClick={() => handleSelect(player.ability2)}
      >
        <Typography variant="h5">{player.ability2.name}</Typography>
        {player.ability2.strengthIncrease > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '8px'
            }}
          >
            <Image
              priority
              src={str.src}
              alt="strong"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability2.strengthIncrease}`}</Typography>
          </Box>
        )}
        {player.ability2.agilityIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={dex.src}
              alt="dexterity"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability2.agilityIncrease}`}</Typography>
          </Box>
        )}
        {player.ability2.healthIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={hp.src}
              alt="health"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability2.healthIncrease}`}</Typography>
          </Box>
        )}
        {player.ability2.speedIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={speed.src}
              alt="speed"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability2.speedIncrease}`}</Typography>
          </Box>
        )}
      </Box>
      )}

      {player.ability3 && (
        <Box
        sx={{
          width: '180px',
          height: '180px',
          border: selectedAbility === player.ability3 ? '1px solid black' : 'none',
          cursor: 'pointer',
          marginBottom: 2,
          backgroundColor: selectedAbility === player.ability3 ? '#9ac3ed' : '#d9d6b6',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          borderRadius: '30px'
        }}
        onClick={() => handleSelect(player.ability3)}
      >
        <Typography variant="h5">{player.ability3.name}</Typography>
        {player.ability1.strengthIncrease > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '8px'
            }}
          >
            <Image
              priority
              src={str.src}
              alt="strong"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability3.strengthIncrease}`}</Typography>
          </Box>
        )}
        {player.ability3.agilityIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={dex.src}
              alt="dexterity"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability3.agilityIncrease}`}</Typography>
          </Box>
        )}
        {player.ability3.healthIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={hp.src}
              alt="health"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability3.healthIncrease}`}</Typography>
          </Box>
        )}
        {player.ability3.speedIncrease > 0 && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '8px'
          }}
          >
            <Image
              priority
              src={speed.src}
              alt="speed"
              width={50}
              height={50}
            />
            <Typography sx={{marginLeft: '10px'}}>{`+ ${player.ability3.speedIncrease}`}</Typography>
          </Box>
        )}
      </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Validate
      </Button>
    </Container>
  )
}

export default LevelUpChoices
