import React, { useContext, useState } from 'react'
import { Button, Box, Container, Typography, Grid } from '@mui/material'
import { Player } from 'src/types/Player'
import { Capacity } from 'src/types/Capacity'
import Image from 'next/legacy/image'
import hp from '#/public/hp.png'
import str from '#/public/biceps.png'
import dex from '#/public/dex.png'
import speed from '#/public/speed.png'
import damage from '#/public/damage.png'
import def from '#/public/def.png'
import axios from 'axios'
import PlayerContext from 'src/utils/PlayerContext'

const LevelUpCapacitiesChoices = () => {
  const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(
    null
  )
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)
  const handleSelect = (Capacity: Capacity) => {
    setSelectedCapacity(Capacity)
  }

  const handleSubmit = async () => {
    if (selectedCapacity && currentPlayer) {
      try {
        const updatedPlayer = {
          dex: currentPlayer.dex + selectedCapacity.dexterityIncrease,
          str: currentPlayer.str + selectedCapacity.strengthIncrease,
          speed: currentPlayer.speed + selectedCapacity.speedIncrease,
          hpMax: currentPlayer.hpMax + selectedCapacity.healthIncrease,
          hp: currentPlayer.hp + selectedCapacity.healthIncrease,
          def: currentPlayer.def + selectedCapacity.defIncrease,
          dmgMax: currentPlayer.dmgMax + selectedCapacity.dmgMaxIncrease,
          dmgMin: currentPlayer.dmgMin + selectedCapacity.dmgMinIncrease,
          level: currentPlayer.level,
          levelingUp: currentPlayer.levelingUp,
          abilityRequired: currentPlayer.abilityRequired,
          skillsRequired: currentPlayer.skillsRequired,
          capacitiesRequired: false,
          pa: currentPlayer.pa,
          paMax: currentPlayer.paMax,
          init: currentPlayer.init,
          xp: currentPlayer.xp,
          capacities: { connect: { id: selectedCapacity.id } }
        }

        const response = await fetch(`/api/user/${currentPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        })
        if (response.status === 200) {
          const deleteResponse = await fetch(
            `/api/user/${currentPlayer.id}/capacities`,
            {
              method: 'DELETE'
            }
          )

          if (deleteResponse.status !== 200) {
            throw new Error(
              `Failed to delete abilitiesChoices for player ${currentPlayer.id}`
            )
          }

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

  function RenderCapacityChoice({ capacityChoice } : any) {
    const icons: { [key: string]: string } = {
      strength: str.src,
      dexterity: dex.src,
      health: hp.src,
      speed: speed.src,
      damage: damage.src,
      defense: def.src
    }

    const attributes = [
      { key: 'strengthIncrease', name: 'strength' },
      { key: 'dexterityIncrease', name: 'dexterity' },
      { key: 'healthIncrease', name: 'health' },
      { key: 'speedIncrease', name: 'speed' },
      { key: 'dmgMinIncrease', name: 'damage' },
      { key: 'dmgMaxIncrease', name: 'damage' },
      { key: 'defIncrease', name: 'defense' }
    ]

    return (
      <Box
        sx={{
          width: '200px',
          height: 'auto',
          cursor: 'pointer',
          marginBottom: 2,
          backgroundColor:
            selectedCapacity === capacityChoice.capacity
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
            capacityChoice &&
            capacityChoice.capacity
          ) {
            handleSelect(capacityChoice.capacity)
          }
        }}
      >
        <Typography variant="h5">
          {capacityChoice.capacity.name}
        </Typography>
        {attributes.map((attr, index) => {
          if (capacityChoice.capacity[attr.key] > 0) {
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
                  capacityChoice.capacity[attr.key]
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
        Choisissez votre capacité
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ width: 'auto' }}
      >
        {currentPlayer && currentPlayer.capacityChoices && 
          currentPlayer.capacityChoices.map((choice, index) => (
            choice.capacity && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
                key={index}
              >
                <RenderCapacityChoice
                  capacityChoice={choice}
                  handleSelect={handleSelect}
                  selectedCapacity={selectedCapacity}
                />
              </Grid>
            )
          ))
        }
      </Grid>

      <Button
        variant="contained"
        color="primary"
        disabled={!selectedCapacity}
        onClick={handleSubmit}
      >
        Validate
      </Button>
    </Container>
  );
}

export default LevelUpCapacitiesChoices
