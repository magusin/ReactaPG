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
        Choisissez votre capacité pour le level up
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
          {currentPlayer &&
            currentPlayer.capacityChoices &&
            currentPlayer.capacityChoices[0].capacity && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedCapacity === currentPlayer.capacityChoices[0].capacity
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
                    currentPlayer &&
                    currentPlayer.capacityChoices &&
                    currentPlayer.capacityChoices[0].capacity
                  ) {
                    handleSelect(currentPlayer.capacityChoices[0].capacity)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.capacityChoices[0].capacity.name}
                </Typography>
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  currentPlayer.capacityChoices[0].capacity.strengthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.strengthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  currentPlayer.capacityChoices[0].capacity.dexterityIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.dexterityIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  currentPlayer.capacityChoices[0].capacity.healthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.healthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  currentPlayer.capacityChoices[0].capacity.speedIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.speedIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  (currentPlayer.capacityChoices[0].capacity.dmgMinIncrease > 0 ||
                  currentPlayer.capacityChoices[0].capacity.dmgMaxIncrease > 0) && (
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
                        src={damage.src}
                        alt="damage"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.dmgMinIncrease} - ${currentPlayer.capacityChoices[0].capacity.dmgMaxIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[0].capacity &&
                  currentPlayer.capacityChoices[0].capacity.defIncrease > 0 && (
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
                        src={def.src}
                        alt="health"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[0].capacity.defIncrease}`}</Typography>
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
          {currentPlayer &&
            currentPlayer.capacityChoices &&
            currentPlayer.capacityChoices[1].capacity && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedCapacity === currentPlayer.capacityChoices[1].capacity
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
                    currentPlayer &&
                    currentPlayer.capacityChoices &&
                    currentPlayer.capacityChoices[1].capacity
                  ) {
                    handleSelect(currentPlayer.capacityChoices[1].capacity)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.capacityChoices[1].capacity.name}
                </Typography>
                {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  currentPlayer.capacityChoices[1].capacity.strengthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.strengthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  currentPlayer.capacityChoices[1].capacity.dexterityIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.dexterityIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  currentPlayer.capacityChoices[1].capacity.healthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.healthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  currentPlayer.capacityChoices[1].capacity.speedIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.speedIncrease}`}</Typography>
                    </Box>
                  )}
              {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  (currentPlayer.capacityChoices[1].capacity.dmgMinIncrease > 0 ||
                  currentPlayer.capacityChoices[1].capacity.dmgMaxIncrease > 0) && (
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
                        src={damage.src}
                        alt="damage"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.dmgMinIncrease} - ${currentPlayer.capacityChoices[1].capacity.dmgMaxIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[1].capacity &&
                  currentPlayer.capacityChoices[1].capacity.defIncrease > 0 && (
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
                        src={def.src}
                        alt="health"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[1].capacity.defIncrease}`}</Typography>
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
          {currentPlayer &&
            currentPlayer.capacityChoices &&
            currentPlayer.capacityChoices[2].capacity && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedCapacity === currentPlayer.capacityChoices[2].capacity
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
                    currentPlayer &&
                    currentPlayer.capacityChoices &&
                    currentPlayer.capacityChoices[2].capacity
                  ) {
                    handleSelect(currentPlayer.capacityChoices[2].capacity)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.capacityChoices[2].capacity.name}
                </Typography>
                {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  currentPlayer.capacityChoices[2].capacity.strengthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.strengthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  currentPlayer.capacityChoices[2].capacity.dexterityIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.dexterityIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  currentPlayer.capacityChoices[2].capacity.healthIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.healthIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  currentPlayer.capacityChoices[2].capacity.speedIncrease > 0 && (
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
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.speedIncrease}`}</Typography>
                    </Box>
                  )}
              {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  (currentPlayer.capacityChoices[2].capacity.dmgMinIncrease > 0 ||
                  currentPlayer.capacityChoices[2].capacity.dmgMaxIncrease > 0) && (
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
                        src={damage.src}
                        alt="damage"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.dmgMinIncrease} - ${currentPlayer.capacityChoices[2].capacity.dmgMaxIncrease}`}</Typography>
                    </Box>
                  )}
                {currentPlayer &&
                  currentPlayer.capacityChoices[2].capacity &&
                  currentPlayer.capacityChoices[2].capacity.defIncrease > 0 && (
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
                        src={def.src}
                        alt="health"
                        width={50}
                        height={50}
                      />
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`+ ${currentPlayer.capacityChoices[2].capacity.defIncrease}`}</Typography>
                    </Box>
                  )}
              </Box>
            )}
        </Grid>
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
  )
}

export default LevelUpCapacitiesChoices
