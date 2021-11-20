import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';

type PlayerType = {
    name: string;
    id: string;
}

export type User = {
    id: string;
    name: string;
    avatar: string;
};

type GameContextType = {
    user: User | null;
    sigin: () => void;

    players: PlayerType[];
    setPlayers: (players: PlayerType[]) => void;
    currentPlayer: PlayerType | null;
    setCurrentPlayer: (player: PlayerType | null) => void;
    gameEnded: boolean;
    handleGameEnded: (value: boolean) => void;

    handleNextPlayer: () => void;
};

const gameContext = createContext({} as GameContextType);

type Props = {
    children: ReactNode;
}


export default ({
    children,
}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [players, setPlayers] = useState<PlayerType[]>([
        { id: '1', name: 'Nina' },
        { id: '2', name: 'Drica' },
        { id: '3', name: 'Lusca' },
    ]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    const sigin = async () => {
        const provider = new GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    const handleGameEnded = (value: boolean) => {
        setGameEnded(value);
    }

    const handleNextPlayer = () => {
        if (!players.length) return;

        if (!currentPlayer) {
            setCurrentPlayer({ ...players[0] })
        } else {

            const currentPlayerIndex = players.findIndex(p => p.id === currentPlayer?.id);

            if (currentPlayerIndex === players.length - 1) setCurrentPlayer({ ...players[0] });
            else setCurrentPlayer({ ...players[currentPlayerIndex + 1] });
        }
    };

    useEffect(() => {
        const cancel = auth.onAuthStateChanged(user => {
          if (user) {
            const { displayName, photoURL, uid } = user
    
            if (!displayName || !photoURL) {
              throw new Error('Missing information from Google Account.');
            }
    
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
    
        return () => {
          cancel();
        }
      }, [])

    useEffect(() => {
        handleNextPlayer();
    }, [])
    
    return (
        <gameContext.Provider value={{
            sigin,
            user,
            players,
            setPlayers,
            currentPlayer,
            setCurrentPlayer,
            gameEnded,
            handleGameEnded,
            handleNextPlayer
        }}>
            { children }
        </gameContext.Provider>
    );
};

export const useGameContext = () => useContext(gameContext);