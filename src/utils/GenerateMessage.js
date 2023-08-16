const messagesEchec = [
    (attacker, defender) => `${attacker.username} tente une attaque mais ${defender.username} a {esquivé}`,
    (attacker, defender) => `${attacker.username} attaque mais ${defender.username} {esquive} de justesse`,
    (attacker, defender) => `${attacker.username} frappe mais ${defender.username} {esquive} rapidement`,
    (attacker, defender) => `${attacker.username} attaque furieusement, ${defender.username} {l'esquive}`
  ];

  const failMessages = [
    (attacker, defender) => `${attacker.username} attempts an attack but ${defender.username} {dodges}`,
    (attacker, defender) => `${attacker.username} attacks but ${defender.username} {dodges} just barely`,
    (attacker, defender) => `${attacker.username} hits but ${defender.username} {dodges} quickly`,
    (attacker, defender) => `${attacker.username} attacks furiously, ${defender.username} {dodge}`
  ];
  
  const successMessages = [
    (attacker, defender, damage) => `${attacker.username} attacks and deals [${damage}] damage to ${defender.username}`,
    (attacker, defender, damage) => `${attacker.username} rushes ${defender.username} and deals [${damage}] damage`,
    (attacker, defender, damage) => `${attacker.username} hits ${defender.username} and inflicts [${damage}] damage`,
    (attacker, defender, damage) => `${attacker.username} leaps and damages ${defender.username} [${damage}] damage`,
    (attacker, defender, damage) => `${attacker.username} lands a blow dealing [${damage}] damage to ${defender.username}`
  ];

  const messagesRéussite = [
    (attacker, defender, damage) => `${attacker.username} attaque et inflige [${damage}] points de dégat à ${defender.username}`,
    (attacker, defender, damage) => `${attacker.username} se rue sur ${defender.username} et lui occasionne [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} frappe ${defender.username} et lui inflige [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} bondit et blesse ${defender.username} de [${damage}] points de dégat`,
    (attacker, defender, damage) => `${attacker.username} assène un coup infligeant [${damage}] points de dégat à ${defender.username}`
  ];

  const messagesRenaissance = [
    (attacker, defender, damage) => `${attacker.username} se relève et regagne [${damage}] points de vies`,
    (attacker, defender, damage) => `${attacker.username} n'abandonne pas et récupère [${damage}] points de vies`
  ];
  
  export default function GenerateMessage(attacker, defender, damage, currentLanguage, rebirth) {
    let messages;
    if (rebirth) {
      messages = currentLanguage === 'fr' ? messagesRenaissance : rebirthMessages;
  } else if (damage === 0) {
      messages = currentLanguage === 'fr' ? messagesEchec : failMessages;
  } else {
      messages = currentLanguage === 'fr' ? messagesRéussite : successMessages;
  }
     const index = Math.floor(Math.random() * messages.length);
     const generateMessage = messages[index];
     return generateMessage(attacker, defender, damage);
  }