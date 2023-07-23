import { Player } from "src/types/Player";

export interface Capacity {
    id: number
    name: string
    defIncrease: number
    dmgMaxIncrease: number
    dmgMinIncrease: number
    healthIncrease: number
    strengthIncrease: number
    dexterityIncrease: number
    speedIncrease: number
    players: Player[]
    playersChoices: Player[]
  }