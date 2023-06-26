'use client'
import { styled } from '@mui/material/styles';

const Header = styled('header')({
  backgroundImage: `url("https://brute.eternaltwin.org/images/fr/header/head.jpg")`,
 
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '1500px',
  minWidth: '600px',
});

export default Header;