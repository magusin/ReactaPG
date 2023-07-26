import { AbilityChoice } from 'src/types/AbilityChoice'

export interface Ability {
    id: number
    name: string
    strengthIncrease: number
    dexterityIncrease: number
    healthIncrease: number
    speedIncrease: number
    abilityChoices: AbilityChoice[];
  }