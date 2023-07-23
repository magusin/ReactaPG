import { Player } from 'src/utils/Player'

export interface Spell {
    id: number
    name: string
    description: string
    players: Player[]
  }