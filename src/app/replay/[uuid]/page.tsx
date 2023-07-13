/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Fight } from 'src/types/Fight'
import { usePathname, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  CircularProgress,
  Grid,
  Button
} from '@mui/material'

export default function Replay() {
  const [fight, setFight] = useState<Fight | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const uuid = pathname ? pathname.split('/').pop() : ''

  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    setUser(currentUser)
    if (currentUser != null) {
      const fetchFightData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/fight/${uuid}`)
          const fightData: Fight = res.data
          setFight(fightData)
          setIsLoading(false)
        } catch (error) {
          console.error('Failed to fetch fight data:', error.message)
          setError('Failed to fetch fight data')
        } finally {
          setIsLoading(false)
        }
      }

      if (uuid) {
        fetchFightData()
      }
    } else {
      // L'utilisateur n'est pas connecté ou vient de se déconnecter
      setPlayer(null)
      setIsLoading(false)
    }
  }, [uuid])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <Box
          className="boxGlobalStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            height: '100px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            No fight found
          </Typography>
        </Box>
        <Box
          className="boxTitleStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '50px',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            <Button
                onClick={() => router.push('/')}
              >
                Go to Home
              </Button>
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <>
      {fight && fight.events ? (
        <div>
          <h1>Fight Replay</h1>
          {fight.events.map((event, index) => (
            <p key={index}>{event.message}</p>
          ))}
        </div>
      ) : (
        <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <Box
          className="boxGlobalStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            height: '100px',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            No fight found
          </Typography>
        </Box>
        <Box
          className="boxTitleStyles"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '50px',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              mx: 'auto'
            }}
          >
            <Button
                style={{ marginRight: '8px' }}
                onClick={() => router.push('/')}
              >
                Go to Home
              </Button>
          </Typography>
        </Box>
      </Container>
      )}
    </>
  )
}
