'use client'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { i18n } = useTranslation()
  // translation current language
  const currentLanguage = i18n.language
  const router = useRouter()
  const home = () => {
    router.push('/')
  }

  const bgImageUrl =
    currentLanguage === 'fr'
      ? 'https://brute.eternaltwin.org/images/fr/header/head.jpg'
      : 'https://brute.eternaltwin.org/images/en/header/head.jpg'

  const StyledHeader = styled('header')({
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '600px',
    marginBottom: '50px'
  })

  const ClickableImage = styled('div')(({ bgImageUrl }) => ({
    backgroundImage: `url("${bgImageUrl}")`,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  }))

  const HeaderImage = styled('img')({
    width: '100%',
    height: '100%'
  })
  return (
    <StyledHeader>
      <ClickableImage bgImageUrl={bgImageUrl} onClick={home} />
    </StyledHeader>
  )
}

export default Header
