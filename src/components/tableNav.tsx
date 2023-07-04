import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import tableWood from '#/public/tableWood.png'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TableNav = () => {
  const router = useRouter()

  const handleLogout = async (e : React.MouseEvent) => {
    await localStorage.removeItem('user')
    await window.location.reload()
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: '500px', md: '500px' },
        height: { xs: '100%', md: '100%' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          width: { xs: '400px', md: '500px' },
          height: { xs: '600px', md: '600px' },
          position: 'relative'
        }}
      >
        <Image
          priority
          src={tableWood.src}
          alt="panneau d'action"
          layout="responsive"
          sizes="(max-width: 300px) 100vw, 300px"
          width={300}
          height={400}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: {xs:'15%', md: '20%'},
          fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit'
            }
          },
          fontWeight: 'bold',
          color: '#674106'
        }}
      >
        <Link href="/">Adventure</Link>
      </Typography>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: {xs:'30%', md: '35%'},
          fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit'
            }
          },
          fontWeight: 'bold',
          color: '#674106'
        }}
      >
        <Link href="/duel">Duel</Link>
      </Typography>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: {xs:'45%', md: '50%'},
          fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit'
            }
          },
          fontWeight: 'bold',
          color: '#674106'
        }}
      >
        <Link href="/">Arêne</Link>
      </Typography>
      <Typography
        variant="h4"
        sx={{
           position: 'absolute',
          top: {xs:'60%', md: '65%'},
          fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          color: 'red',
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit'
            }
          }
        }}
      >
        <Link href="/" onClick={handleLogout}>
          LogOut
        </Link>
      </Typography>
    </Container>
  )
}

export default TableNav
