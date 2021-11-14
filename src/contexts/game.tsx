import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';

type PlayerType = {
    name: string;
    id: string;
}

type GameContextType = {
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
    const [players, setPlayers] = useState<PlayerType[]>([
        { id: '1', name: 'Nina' },
        { id: '2', name: 'Drica' },
        { id: '3', name: 'Lusca' },
    ]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

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
        handleNextPlayer();
    }, [])
    
    return (
        <gameContext.Provider value={{
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