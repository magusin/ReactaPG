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

const LevelUpAbilityChoices = () => {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null)
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)
  const handleSelect = (ability: Ability) => {
    setSelectedAbility(ability)
  }

  const handleSubmit = async () => {
    if (selectedAbility && currentPlayer) {
      try {
        // Step 1: Update the player
        const updatedPlayer = {
          dex: currentPlayer.dex + selectedAbility.dexterityIncrease,
          str: currentPlayer.str + selectedAbility.strengthIncrease,
          speed: currentPlayer.speed + selectedAbility.speedIncrease,
          hpMax: currentPlayer.hpMax + selectedAbility.healthIncrease,
          hp: currentPlayer.hp + selectedAbility.healthIncrease,
          level: currentPlayer.level,
          levelingUp: currentPlayer.levelingUp,
          abilityRequired: false,
          capacitiesRequired: currentPlayer.capacitiesRequired,
          skillsRequired: currentPlayer.skillsRequired,
          xp: currentPlayer.xp
        }

        const response = await fetch(`/api/user/${currentPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        })

        // Step 2: Remove the abilityChoices from the player
        if (response.status === 200) {
          const deleteResponse = await fetch(
            `/api/user/${currentPlayer.id}/abilities`,
            {
              method: 'DELETE'
            }
          )

          if (deleteResponse.status !== 200) {
            throw new Error(
              `Failed to delete abilityChoices for player ${currentPlayer.id}`
            )
          }

          // Step 3: Fetch the updated player information
          const playerResponse = await fetch(`/api/user/${currentPlayer.id}`)
          if (playerResponse.status === 200) {
            const playerData = await playerResponse.json()
            setCurrentPlayer(playerData)
          }
        }
      } catch (error) {
        console.error('Error updating player: ', error)
      }
    }
  }

  console.log('selectedAbility: ', selectedAbility)
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
          {currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[0].ability && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilityChoices[0].ability
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
                if (currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[0].ability) {
                  handleSelect(currentPlayer.abilityChoices[0].ability)
              }              
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilityChoices[0].ability.name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilityChoices[0].ability &&
                currentPlayer.abilityChoices[0].ability.strengthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[0].ability.strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[0].ability &&
                currentPlayer.abilityChoices[0].ability.dexterityIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[0].ability.dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[0].ability &&
                currentPlayer.abilityChoices[0].ability.healthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[0].ability.healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[0].ability &&
                currentPlayer.abilityChoices[0].ability.speedIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[0].ability.speedIncrease}`}</Typography>
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
          {currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[1].ability && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilityChoices[1].ability
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
                if (currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[1].ability) {
                  handleSelect(currentPlayer.abilityChoices[1].ability)
                }
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilityChoices[1].ability.name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilityChoices[1].ability &&
                currentPlayer.abilityChoices[1].ability.strengthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[1].ability.strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[1].ability &&
                currentPlayer.abilityChoices[1].ability.dexterityIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[1].ability.dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[1].ability &&
                currentPlayer.abilityChoices[1].ability.healthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[1].ability.healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[1].ability &&
                currentPlayer.abilityChoices[1].ability.speedIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[1].ability.speedIncrease}`}</Typography>
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
          {currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[2].ability && (
            <Box
              sx={{
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                marginBottom: 2,
                backgroundColor:
                  selectedAbility === currentPlayer.abilityChoices[2].ability
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
                if (currentPlayer && currentPlayer.abilityChoices && currentPlayer.abilityChoices[2].ability) {
                  handleSelect(currentPlayer.abilityChoices[2].ability)
                }
              }}
            >
              <Typography variant="h5">
                {currentPlayer.abilityChoices[2].ability.name}
              </Typography>
              {currentPlayer &&
                currentPlayer.abilityChoices[2].ability &&
                currentPlayer.abilityChoices[2].ability.strengthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[2].ability.strengthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[2].ability &&
                currentPlayer.abilityChoices[2].ability.dexterityIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[2].ability.dexterityIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[2].ability &&
                currentPlayer.abilityChoices[2].ability.healthIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[2].ability.healthIncrease}`}</Typography>
                  </Box>
                )}
              {currentPlayer &&
                currentPlayer.abilityChoices[2].ability &&
                currentPlayer.abilityChoices[2].ability.speedIncrease > 0 && (
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
                    >{`+ ${currentPlayer.abilityChoices[2].ability.speedIncrease}`}</Typography>
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

export default LevelUpAbilityChoices
