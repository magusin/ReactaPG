import { Player } from 'src/types/Player'
import { Ability } from 'src/types/Ability'

export interface AbilityChoice {
    id: number;
    playerId: number;
    player: Player;
    abilityId: number;
    ability: Ability;
  };