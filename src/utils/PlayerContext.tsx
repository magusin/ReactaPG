import { createContext } from 'react';
import { Player } from 'src/types/Player';

interface PlayerContextProps {
  currentPlayer: Player | null;
  challengingPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;
  setChallengingPlayer: (player: Player | null) => void;
}

const PlayerContext = createContext<PlayerContextProps>({
    currentPlayer: null,
    challengingPlayer: null,
    setCurrentPlayer: () => {}, 
    setChallengingPlayer: () => {},
});

export default PlayerContext;