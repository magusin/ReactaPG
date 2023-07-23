import { Player } from 'src/types/Player'
import { Event } from 'src/types/FightEvents'

export interface Fight {
    uuid: string
    player1_id: number
    player2_id: number
    winner_id: number
    timestamp: Date
    player1HP: number
    player2HP: number
    player1: Player
    player2: Player
    events?: Event[]
  }