import React from 'react';
import { Container, Typography } from '@mui/material';
import tableWood from '../../public/tableWood.png';
import Image from 'next/image';

const PixiCanvas = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '500px',
        position: 'relative',
        alignItems: 'center',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        width: '500px',
        marginRight: 'auto',
        marginLeft: 0,
      }}
    >
      <Image 
        src={tableWood.src}
        alt="table en bois"
        width={500}
        height={500}
      />

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: '20%',
          left: '120px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        Aventure
      </Typography>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: '40%',
          left: '120px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        Duel
      </Typography>

      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: '60%',
          left: '120px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        Arêne
      </Typography>
    </Container>
  );
};

export default PixiCanvas;
