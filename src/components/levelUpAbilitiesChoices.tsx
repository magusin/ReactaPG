import React, { useContext, useState } from 'react'
import { Button, Box, Container, Typography, Grid } from '@mui/material'
import { Player } from 'src/types/Player'
import { Ability } from 'src/types/Ability'
import Image from 'next/legacy/image'
import hp from '#/public/hp.png'
import str from '#/public/biceps.png'
import dex from '#/public/dex.png'
import speed from '#/public/speed.png'
import axios from 'axios'
import PlayerContext from 'src/utils/PlayerContext'

const LevelUpAbilitiesChoices = () => {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null)
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)
  const handleSelect = (ability: Ability) => {
    setSelectedAbility(ability)
  }

  const handleSubmit = async () => {
    if (selectedAbility && currentPlayer) {
      try {
        const updatedPlayer = {
          dex: currentPlayer.dex + selectedAbility.dexterityIncrease,
          str: currentPlayer.str + selectedAbility.strengthIncrease,
          speed: currentPlayer.speed + selectedAbility.speedIncrease,
          hpMax: currentPlayer.hpMax + selectedAbility.healthIncrease,
          hp: currentPlayer.hp + selectedAbility.healthIncrease,
          abilityRequired: false,
          levelingUp:
            currentPlayer.capacitiesRequired || currentPlayer.spellsRequired
              ? true
              : false,
          level:
            !currentPlayer.capacitiesRequired && !currentPlayer.spellsRequired
              ? currentPlayer.level + 1
              : currentPlayer.level
        }

        const response = await fetch(`/api/user/${currentPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        })
        if (response.status === 200) {
          const data = await response.json()
          console.log(data)
          setCurrentPlayer(data)

          try {
            const response = await fetch(`/api/user/${currentPlayer.id}/abilities`, {
              method: 'DELETE',
            })
            if (response.status !== 200) {
              throw new Error(`Failed to delete abilitiesChoices for player ${currentPlayer.id}`)
            }
          } catch (error) {
            console.error('Error deleting abilitiesChoices: ', error)
          }
        }
      } catch (error) {
        console.error('Error updating player: ', error)
      }
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
      <Typography
        variant="h4"
        sx={{ margin: '12px', fontFamily: 'fantasy', textAlign: 'center' }}
      >
        Choisissez votre habileté pour le level up
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ width: 'auto' }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[0] && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilitiesChoices[0]
                    ? '#9ac3ed'
                    : '#d9d6b6',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '30px'
              }}
              onClick={() => {
                if (currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[0]) {
                  handleSelect(currentPlayer.abilitiesChoices[0])
              }              
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilitiesChoices[0].name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilitiesChoices[0] &&
                currentPlayer.abilitiesChoices[0].strengthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[0].strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[0] &&
                currentPlayer.abilitiesChoices[0].dexterityIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[0].dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[0] &&
                currentPlayer.abilitiesChoices[0].healthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[0].healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[0] &&
                currentPlayer.abilitiesChoices[0].speedIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[0].speedIncrease}`}</Typography>
                  </Box>
                )}
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[1] && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilitiesChoices[1]
                    ? '#9ac3ed'
                    : '#d9d6b6',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '30px'
              }}
              onClick={() => {
                if (currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[1]) {
                  handleSelect(currentPlayer.abilitiesChoices[1])
                }
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilitiesChoices[1].name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilitiesChoices[1] &&
                currentPlayer.abilitiesChoices[1].strengthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[1].strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[1] &&
                currentPlayer.abilitiesChoices[1].dexterityIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[1].dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[1] &&
                currentPlayer.abilitiesChoices[1].healthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[1].healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[1] &&
                currentPlayer.abilitiesChoices[1].speedIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[1].speedIncrease}`}</Typography>
                  </Box>
                )}
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[2] && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilitiesChoices[2]
                    ? '#9ac3ed'
                    : '#d9d6b6',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '30px'
              }}
              onClick={() => {
                if (currentPlayer && currentPlayer.abilitiesChoices && currentPlayer.abilitiesChoices[2]) {
                  handleSelect(currentPlayer.abilitiesChoices[2])
                }
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilitiesChoices[2].name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilitiesChoices[2] &&
                currentPlayer.abilitiesChoices[2].strengthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[2].strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[2] &&
                currentPlayer.abilitiesChoices[2].dexterityIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[2].dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[2] &&
                currentPlayer.abilitiesChoices[2].healthIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[2].healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilitiesChoices[2] &&
                currentPlayer.abilitiesChoices[2].speedIncrease > 0 && (
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
                    <Typography
                      sx={{ marginLeft: '10px' }}
                    >{`+ ${currentPlayer.abilitiesChoices[2].speedIncrease}`}</Typography>
                  </Box>
                )}
            </Box>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedAbility}
        onClick={handleSubmit}
      >
        Validate
      </Button>
    </Container>
  )
}

export default LevelUpAbilitiesChoices
