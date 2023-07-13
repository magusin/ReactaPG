// mui
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  LinearProgress,
  Tooltip
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/system'

interface PlayerComponent {
  player: string
  hp: number
  hpMax: number
  color: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000'
    }
  }
})

export default function PlayerInfo({
    player,
    hp,
    hpMax,
    color
  }: PlayerComponent) {
    return (
      <Box style={{ maxWidth: '100%' }}>
        <Typography
          variant="h3"
          color={color}
          style={{
            wordBreak: 'break-all',
            textAlign: 'center'
          }}
        >
          {player.toUpperCase()}
        </Typography>
        <Tooltip title={`${hp} / ${hpMax} Health`}>
          <div>
            <ThemeProvider theme={theme}>
              <LinearProgress
                variant="determinate"
                value={(hp / hpMax) * 100}
                color="primary"
                style={{
                  height: '10px',
                  marginTop: '20px',
                  borderStyle: 'solid'
                }}
              />
            </ThemeProvider>
          </div>
        </Tooltip>
      </Box>
    )
  }
  
