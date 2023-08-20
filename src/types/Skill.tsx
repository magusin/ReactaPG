import { Player } from 'src/types/Player'
import { SkillChoice } from 'src/types/SkillChoice'

export interface Skill {
    id: number
    name: string
    description: string
    players: Player[]
    skillChoices: SkillChoice[]
  }