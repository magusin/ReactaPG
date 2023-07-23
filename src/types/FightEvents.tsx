import { Fight } from "src/utils/Fight";

export interface Event {
    id: number;
    message: string
    timestamp: Date
    fight_id: string
    position: number
    hpPlayer1: number
    hpPlayer2: number
    Fight: Fight
}