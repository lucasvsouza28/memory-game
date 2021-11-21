import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';
import { UserType } from '../types/User';

type PlayerType = {
    name: string;
    id: string;
}

type GameContextType = {
    user: UserType | null;
    sigin: () => void;

    currentGameKey: string;
    changeCurrentGameKey: (gameKey: string) => void;

    gameEnded: boolean;
    handleGameEnded: (value: boolean) => void;
};

const gameContext = createContext({} as GameContextType);

type Props = {
    children: ReactNode;
}


export default ({
    children,
}: Props) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [currentGameKey, setCurrentGameKey] = useState<string>('');
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

    const changeCurrentGameKey = (gameKey: string) => {
        setCurrentGameKey(gameKey);
    }

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
    
    return (
        <gameContext.Provider value={{
            sigin,
            user,
            gameEnded,
            handleGameEnded,
            currentGameKey,
            changeCurrentGameKey,
        }}>
            { children }
        </gameContext.Provider>
    );
};

export const useGameContext = () => useContext(gameContext);