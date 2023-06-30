import { styled } from '@mui/material/styles';
import Link from 'next/link';

const StyledHeader = styled('header')({
  backgroundImage: `url("https://brute.eternaltwin.org/images/fr/header/head.jpg")`,
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'relative',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '600px',
  marginBottom: '50px',
  cursor: 'pointer',
});

const HeaderImage = styled('img')({
  width: '100%',
  height: '100%',
});

const Header = () => {
  return (
    <Link href="/">
      <StyledHeader />
    </Link>
  );
};

export default Header;