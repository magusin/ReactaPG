import { Player } from "src/types/Player";
import { Skill } from "src/types/Skill";

export interface SkillChoice {
    id: number
    player : Player
    skill : Skill
    playerID : number
    skillID : number
}