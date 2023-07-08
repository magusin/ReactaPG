import { createContext } from 'react';

const PlayerContext = createContext({
    currentPlayer: { hpMax: 0},
  setCurrentPlayer: () => {},
  challengingPlayer: { hpMax: 0},
  setChallengingPlayer: () => {},
});

export default PlayerContext;