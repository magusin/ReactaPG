import { Player } from 'src/types/Player'
import { CapacityChoice } from 'src/types/CapacityChoice'

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
  capacityChoices: CapacityChoice[]
  players: Player[]
}
