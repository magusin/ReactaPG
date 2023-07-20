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
  ability1Id: number | null
  ability1: Ability | null
  ability2Id: number | null
  ability2: Ability | null
  ability3Id: number | null
  ability3: Ability | null
}
