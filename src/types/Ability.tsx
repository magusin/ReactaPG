import { Player } from 'src/types/Player'

export interface Ability {
    id: number
    name: string
    strengthIncrease: number
    dexterityIncrease: number
    healthIncrease: number
    speedIncrease: number
    playersChoices: Player[]
  }