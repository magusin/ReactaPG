import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import tableWood from '../../public/tableWood.png'
import Image from 'next/image'
import Link from 'next/link'

const TableNav = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: '400px', md: '600px' },
        height: { xs: '100%', md: '100%' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={{
          width: { xs: '300px', md: '500px' },
          height: { xs: '400px', md: '500px' },
          position: 'relative'
        }}
      >
        <Image src={tableWood.src} alt="table en bois" layout="fill" />
      </Box>

      <Typography
  variant={{ xs: 'h6', md: 'h4' }}
  sx={{
    position: 'absolute',
    top: '20%',
    fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        color: 'inherit',
      },
    },
    fontWeight: 'bold',
  }}
>
  <Link href="/">Aventure</Link>
</Typography>

      <Typography
        variant={{ xs: 'h6', md: 'h4' }}
        sx={{
          position: 'absolute',
          top: '40%',
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
          fontWeight: 'bold'
        }}
      >
        <Link href="/">Duel</Link>
      </Typography>

      <Typography
        variant={{ xs: 'h6', md: 'h4' }}
        sx={{
          position: 'absolute',
          top: '60%',
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
          fontWeight: 'bold'
        }}
      >
        <Link href="/">Arêne</Link>
      </Typography>
    </Container>
  )
}

export default TableNav
