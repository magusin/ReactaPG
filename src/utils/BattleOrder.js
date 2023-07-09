import React from 'react';

const calculateSpeed = (speed) => {
  return Math.ceil(speed / 3) + 1;
}

function BattleOrder({players}) {
  const [player1, player2] = players;

  // Calcule les valeurs de vitesse
  player1.battleSpeed = calculateSpeed(player1.speed);
  player2.battleSpeed = calculateSpeed(player2.speed);
  // Détermine le premier joueur basé sur l'initiative ou aléatoirement si égalité
  let firstPlayer, secondPlayer;
  if (player1.ini > player2.ini) {
    firstPlayer = player1;
    secondPlayer = player2;
  } else if (player1.ini < player2.ini) {
    firstPlayer = player2;
    secondPlayer = player1;
  } else {
    // si les stats ini sont identiques, choisit aléatoirement
    if (Math.random() < 0.5) {
      firstPlayer = player1;
      secondPlayer = player2;
    } else {
      firstPlayer = player2;
      secondPlayer = player1;
    }
  }

  // Crée le tableau d'ordre de combat
  let battleOrder = [];
  let firstPlayerActionTime = 0;
  let secondPlayerActionTime = 0;
  const ACTION_THRESHOLD = firstPlayer.battleSpeed + secondPlayer.battleSpeed; 

  while (battleOrder.length < 100) {
    firstPlayerActionTime += firstPlayer.battleSpeed;
    secondPlayerActionTime += secondPlayer.battleSpeed;

    while (firstPlayerActionTime >= ACTION_THRESHOLD) {
      battleOrder.push(firstPlayer.username);
      firstPlayerActionTime -= ACTION_THRESHOLD;
    }

    while (secondPlayerActionTime >= ACTION_THRESHOLD) {
      battleOrder.push(secondPlayer.username);
      secondPlayerActionTime -= ACTION_THRESHOLD;
    }
  }

  // l'ordre de combat
  return battleOrder;
}

export default BattleOrder;