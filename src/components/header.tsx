'use client'
import { styled } from '@mui/material/styles';

const Header = styled('header')({
  backgroundImage: `url("https://brute.eternaltwin.org/images/fr/header/head.jpg")`,
 
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'relative',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '600px',
});

export default Header;