import React from 'react';
import { Container, Typography } from '@mui/material';
import tableWood from '../../public/tableWood.png';
import Image from 'next/image';
import Link from 'next/link';

const PixiCanvas = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: '300px', md: '500px' },
          height: { xs: '300px', md: '500px' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        sx={{
          width: { xs: '300px', md: '500px' },
          height: { xs: '300px', md: '500px' },
          position: 'relative',
        }}
      >
        <Image 
          src={tableWood.src}
          alt="table en bois"
          layout="fill"
          
        />
      </div>

<Typography
        variant={{ xs: 'h6', md: 'h4' }}
        sx={{
          position: 'absolute',
          top: '20%',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit',
            }
          },
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        <Link href="/">Aventure</Link>
      </Typography>

      <Typography
        variant={{ xs: 'h6', md: 'h4' }}
        sx={{
          position: 'absolute',
          top: '40%' ,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit',
            }
          },
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        <Link href="/">Duel</Link>
      </Typography>

      <Typography
        variant={{ xs: 'h6', md: 'h4' }}
        sx={{
          position: 'absolute',
          top:'60%',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'inherit',
            }
          },
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        <Link href="/">Arêne</Link>
      </Typography>
    </Container>
  );
};

export default PixiCanvas;
