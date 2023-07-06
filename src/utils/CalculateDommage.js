function calculateDamage(attacker, defender) {
    let dodge = (Math.floor((defender.dex - defender.level) / 3) - Math.floor((attacker.dex - attacker.level) / 3));
    if (dodge < 5) {
        dodge = 5
    } else if (dodge > 25) {
        dodge = 25
    }
    // Générer un nombre aléatoire entre 0 et 100 pour déterminer si l'esquive réussit
    const dodgeRoll = Math.random() * 100;
    if (dodgeRoll <= dodge) {

        return 0; // Aucun dégât
    } else {
        const damage = Math.floor(Math.random() * (attacker.dmgMax - attacker.dmgMin + 1) + Math.floor(attacker.str / 3)) + attacker.dmgMin;
        const defense = defender.def;
        let damageF = (damage - defense);
        if (damageF < 1) {
            damageF = 1
        }
        return damageF;
    }
}