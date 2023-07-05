import { createContext } from 'react';

const PlayerContext = createContext({
    currentPlayer: null,
    challengingPlayer: null,
    setCurrentPlayer: () => {}, 
    setChallengingPlayer: () => {},
});

export default PlayerContext;