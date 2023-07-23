import { Ability } from 'src/types/Ability'
import { Fight } from 'src/types/Fight'
import { Capacity } from 'src/types/Capacity'
import { Spell } from 'src/types/Spell'

export interface Player {
  id: number
  username: string
  email: string
  def: number
  dex: number
  dmgMax: number
  dmgMin: number
  hp: number
  hpMax: number
  init: number
  level: number
  pa: number
  paMax: number
  str: number
  type: string
  xp: number
  speed: number
  fights?: Fight[]
  fights2?: Fight[]
  abilitiesChoices?: Ability[]
  abilityRequired: boolean
  capacitiesRequired: boolean
  spellsRequired: boolean
  capacities?: Capacity[]
  capacitiesChoices?: Capacity[]
  spells?: Spell[]
  levelingUp: boolean
}
