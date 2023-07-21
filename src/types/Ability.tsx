import { Player } from 'src/types/Player'

export interface Ability {
    id: number;
    name: string;
    strengthIncrease: number;
    dexterityIncrease: number;
    healthIncrease: number;
    speedIncrease: number;
    player1: Player[];
    player2: Player[];
    player3: Player[];
  }