import { Capacity } from 'src/types/Capacity'
import { Player } from 'src/types/Player'

export interface CapacityChoice {
    id: number;
    playerId: number;
    player: Player;
    capacityId: number;
    capacity: Capacity;
}