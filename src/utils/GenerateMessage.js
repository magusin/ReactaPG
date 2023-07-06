const failMessages = [
    (attacker, defender) => `${attacker.username} tente une attaque mais ${defender.username} a esquivé`,
    (attacker, defender) => `${attacker.username} attaque mais ${defender.username} esquive de justesse`,
    (attacker, defender) => `${attacker.username} frappe mais ${defender.username} esquive rapidement`,
    (attacker, defender) => `${attacker.username} attaque furieusement, ${defender.username} l'esquive`
  ];
  
  const successMessages = [
    (attacker, defender, damage) => `${attacker.username} attaque et inflige [${damage}] points de dégat à ${defender.username}`,
    (attacker, defender, damage) => `${attacker.username} se rue sur ${defender.username} et lui occasionne [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} frappe ${defender.username} et lui inflige [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} bondit et blesse ${defender.username} de [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} assène un coup infligeant [${damage}] points de dégat à ${defender.username}`
  ];
  
  export default function GenerateMessage(attacker, defender, damage) {
     const messages = damage === 0 ? failMessages : successMessages;
     const index = Math.floor(Math.random() * messages.length);
     const generateMessage = messages[index];
     return generateMessage(attacker, defender, damage);
  }