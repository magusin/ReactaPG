import React, { useContext, useState } from 'react'
import { Button, Box, Container, Typography, Grid } from '@mui/material'
import { Player } from 'src/types/Player'
import { Skill } from 'src/types/Skill'
import axios from 'axios'
import PlayerContext from 'src/utils/PlayerContext'

const LevelUpSkillsChoice = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)
  const handleSelect = (skill: Skill) => {
    setSelectedSkill(skill)
  }

  const handleSubmit = async () => {
    if (selectedSkill && currentPlayer) {
      try {
        const updatedPlayer = {
          dex: currentPlayer.dex,
          str: currentPlayer.str,
          def: currentPlayer.def,
          dmgMin: currentPlayer.dmgMin,
          dmgMax: currentPlayer.dmgMax,
          hp: currentPlayer.hp,
          hpMax: currentPlayer.hpMax,
          init: currentPlayer.init,
          pa: currentPlayer.pa,
          paMax: currentPlayer.paMax,
          speed: currentPlayer.speed,
          xp: currentPlayer.xp,
          level: currentPlayer.level,
          levelingUp: currentPlayer.levelingUp,
          skills: { connect: { id: selectedSkill.id } },
          skillsRequired: false,
          capacitiesRequired: false,
          abilityRequired: false
        }
        console.log("updatedPlayer", updatedPlayer)
        const response = await fetch(`/api/user/${currentPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        })
        console.log('response', response)
        if (response.status === 200) {
          const deleteResponse = await fetch(
            `/api/user/${currentPlayer.id}/skills`,
            {
              method: 'DELETE'
            }
          )
          if (deleteResponse.status !== 200) {
            throw new Error(deleteResponse.statusText)
          }

          const playerResponse = await fetch(`/api/user/${currentPlayer.id}`)
          if (playerResponse.status === 200) {
            const playerData = await playerResponse.json()
            setCurrentPlayer(playerData)
          }
        }
      } catch (error) {
        console.log(error)
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
        Choisissez votre compétence pour le level up
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
            currentPlayer.skillChoices &&
            currentPlayer.skillChoices[0].skill && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedSkill === currentPlayer.skillChoices[0].skill
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
                    currentPlayer.skillChoices &&
                    currentPlayer.skillChoices[0].skill
                  ) {
                    handleSelect(currentPlayer.skillChoices[0].skill)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.skillChoices[0].skill.name}
                </Typography>
                
                
                {currentPlayer &&
                  currentPlayer.skillChoices[0].skill &&
                  currentPlayer.skillChoices[0].skill.description && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: '8px'
                      }}
                    >
                   
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`${currentPlayer.skillChoices[0].skill.description}`}</Typography>
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
            currentPlayer.skillChoices &&
            currentPlayer.skillChoices[1].skill && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedSkill === currentPlayer.skillChoices[1].skill
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
                    currentPlayer.skillChoices &&
                    currentPlayer.skillChoices[1].skill
                  ) {
                    handleSelect(currentPlayer.skillChoices[1].skill)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.skillChoices[1].skill.name}
                </Typography>
                
                
                {currentPlayer &&
                  currentPlayer.skillChoices[1].skill &&
                  currentPlayer.skillChoices[1].skill.description && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: '8px'
                      }}
                    >
                   
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`${currentPlayer.skillChoices[1].skill.description}`}</Typography>
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
            currentPlayer.skillChoices &&
            currentPlayer.skillChoices[2].skill && (
              <Box
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  marginBottom: 2,
                  backgroundColor:
                    selectedSkill === currentPlayer.skillChoices[2].skill
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
                    currentPlayer.skillChoices &&
                    currentPlayer.skillChoices[2].skill
                  ) {
                    handleSelect(currentPlayer.skillChoices[2].skill)
                  }
                }}
              >
                <Typography variant="h5">
                  {currentPlayer.skillChoices[2].skill.name}
                </Typography>
                
                
                {currentPlayer &&
                  currentPlayer.skillChoices[2].skill &&
                  currentPlayer.skillChoices[2].skill.description && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: '8px'
                      }}
                    >
                   
                      <Typography
                        sx={{ marginLeft: '10px' }}
                      >{`${currentPlayer.skillChoices[2].skill.description}`}</Typography>
                    </Box>
                  )}
              </Box>
            )}
        </Grid>
        </Grid>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedSkill}
        onClick={handleSubmit}
      >
        Validate
      </Button>
    </Container>
  )
}

export default LevelUpSkillsChoice