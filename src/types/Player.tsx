import { Ability } from 'src/types/Ability'
import { Fight } from 'src/types/Fight'
import { Capacity } from 'src/types/Capacity'
import { Skill } from 'src/types/Skill'
import { AbilityChoice } from 'src/types/AbilityChoice'
import { CapacityChoice } from 'src/types/CapacityChoice'
import { SkillChoice } from 'src/types/SkillChoice'

export interface Player {
  id: number;
  username: string;
  password: string;
  email: string;
  def: number;
  dex: number;
  dmgMax: number;
  dmgMin: number;
  hp: number;
  hpMax: number;
  init: number;
  level: number;
  pa: number;
  paMax: number;
  str: number;
  type: string;
  xp: number;
  speed: number;
  fights: Fight[];
  fights2: Fight[];
  abilityChoices: AbilityChoice[];
  abilityRequired: boolean;
  capacitiesRequired: boolean;
  skillsRequired: boolean;
  capacities: Capacity[];
  capacityChoices: CapacityChoice[];
  skills: Skill[];
  skillChoices : SkillChoice[];
  levelingUp: boolean;
}
