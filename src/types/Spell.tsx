import { Player } from 'src/types/Player'

export interface Spell {
    id: number
    name: string
    description: string
    players: Player[]
  }