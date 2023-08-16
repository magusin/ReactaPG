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

  function RenderAbilityChoice({ abilityChoice } : any) {
    const icons: { [key: string]: string } = {
      strength: str.src,
      dexterity: dex.src,
      health: hp.src,
      speed: speed.src
    }

    const attributes = [
      { key: 'strengthIncrease', name: 'strength' },
      { key: 'dexterityIncrease', name: 'dexterity' },
      { key: 'healthIncrease', name: 'health' },
      { key: 'speedIncrease', name: 'speed' }
    ]

    return (
      <Box
        sx={{
          width: '200px',
          height: 'auto',
          cursor: 'pointer',
          marginBottom: 2,
          backgroundColor:
            selectedAbility === abilityChoice.ability
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
          if (
            abilityChoice &&
            abilityChoice.ability
          ) {
            handleSelect(abilityChoice.ability)
          }
        }}
      >
        <Typography variant="h5">
          {abilityChoice.ability.name}
        </Typography>
        {attributes.map((attr, index) => {
          if (abilityChoice.ability[attr.key] > 0) {
            return (
              <Box
              key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '8px'
                }}
              >
                <Image
                  priority
                  src={icons[attr.name]}
                  alt={attr.name}
                  width={50}
                  height={50}
                />
                <Typography sx={{ marginLeft: '10px' }}>{`+ ${
                  abilityChoice.ability[attr.key]
                }`}</Typography>
              </Box>
            )
          }
          return null
        })}
      </Box>
    )
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
        Choisissez votre abilité
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ width: 'auto' }}
      >
        {currentPlayer && currentPlayer.abilityChoices && 
          currentPlayer.abilityChoices.map((choice, index) => (
            choice.ability && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
                key={index}
              >
                <RenderAbilityChoice
                  abilityChoice={choice}
                  handleSelect={handleSelect}
                  selectedAbility={selectedAbility}
                />
              </Grid>
            )
          ))
        }
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
  );
}

export default LevelUpAbilityChoices
