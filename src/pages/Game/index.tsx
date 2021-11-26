import {
    Component,
    useEffect,
    useState
} from 'react';
import * as Icons from 'react-icons/gi';
import { useHistory, useRouteMatch } from 'react-router';
import { Title } from '../../components/Title';
import { useGameContext } from '../../contexts/game';
import { database } from '../../services/firebase';
import { CardType } from '../../types/Card';
import { GameType } from '../../types/GameType';
import { UserType } from '../../types/User';
import { restartGame, createGameFromExistent} from '../../services/game';
import { FlipCard } from './components/FlipCard';

import {
    Container,
    HeaderContainer,
    HeaderButton,
    HeaderAvatar,
    ButtonsContainer,
    CardsContainer,
    PlayersListContainer,
    PlayerItem,
    MainSection,
    PlayerName,
    PlayerPoints,
    CurrentPlayerIndicator,
    PlayerItemAvatar,    
    WinnerTitle,
    WinnerSubTitle,
    WinnersList,
    WinnerItem,
    WinnerName,
    WinnerPoints,
    WinnersButtonsContainer,
    WinnersButton,
    MenuButton,
    ModalMenu,
} from './styles';
import { Modal } from '../../components/Modal';

type GameProps = {

};

type SelectedCardType = {
    card: CardType;
    clearSelection: () => void;
}

export const Game = ({
}: GameProps) => {
    const [theme, setTheme] = useState('');
    const [players, setPlayers] = useState<UserType[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<UserType | null>(null);
    const [gridSize, setGridSize] = useState(4);
    const [cards, setCards] = useState<CardType[]>([]);
    const [founded, setFounded] = useState<CardType[]>([]);
    const [currentSelection, setCurrentSelection] = useState<SelectedCardType | null>(null);
    const [isMobile, setIsMobile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const route = useRouteMatch();
    const history = useHistory();

    const {
        currentGameKey,
        changeCurrentGameKey,
        sigin,
        user,
        gameEnded,
        handleGameEnded,
    } = useGameContext();

    const handleNextPlayer = () => {
        if (players.length <= 1) return;

        const currentPlayerRef = database.ref(`/games/${currentGameKey}/currentPlayer`);

        if (!currentPlayer) {
            currentPlayerRef.update({ ...players[0] })
        } else {

            const currentPlayerIndex = players.findIndex(p => p.id === currentPlayer?.id);

            if (currentPlayerIndex === players.length - 1) currentPlayerRef.update({ ...players[0] });
            else currentPlayerRef.update({ ...players[currentPlayerIndex + 1] });
        }
    };

    const handleCardSelected = async (card: CardType, clearSelection: () => void) => {

        if (!user) sigin();

        if (user?.id !== currentPlayer?.id) return;

        if (!currentSelection)
        {
            setCurrentSelection({ card: { ...card }, clearSelection });
            return;
        }

        if (currentSelection.card.cardKey === card.cardKey &&
            currentSelection.card.id !== card.id) {

            const cardsRef = database.ref(`games/${currentGameKey}/cards`);
            const updatedCards = [...cards.map(c => {
                if (c.cardKey !== card.cardKey) return c;

                c.foundedBy = currentPlayer?.id;

                return c;
            })]

            cardsRef.set(updatedCards);

            setCurrentSelection(null);
            handleNextPlayer(); 
            return;
        } else {
            setTimeout(() => {
                currentSelection.clearSelection();
                clearSelection();
    
                setCurrentSelection(null);
                handleNextPlayer();
            }, 700);
            
        }
    }

    const getIcon = (icon: string) => {
        if (!(icon in Icons)) return null;

        return <> { (Icons as any)[icon]() } </>;
    }

    const renderGame = () => (
        <MainSection
            cols={gridSize}
        >
            <CardsContainer
                cols={gridSize}
            >
                <ul>
                    { cards
                    //.sort((a, b) => a.order > b.order ? -1 : b.order < a.order ? 1 : 0)
                    .map((c, i) => (
                        <li
                            key={c.value + '_' + i}
                        >
                            <FlipCard
                                gameKey={currentGameKey}
                                cards={cards}
                                card={c}
                                pairFounded={founded.some(f => f.value === c.value)}
                                onSelected={handleCardSelected}
                                currentPlayerId={currentPlayer?.id}
                                userId={user?.id}
                            >
                                {
                                    theme === 'Numbers' ? (
                                        c.value
                                    ) : (
                                        getIcon(c.value)
                                    )
                                }
                            </FlipCard>
                        </li>
                    )) }
                </ul>
            </CardsContainer>
            { players.length > 0 && renderPlayersList() }
        </MainSection>
    );

    const isPlayerActive = (player: UserType) => currentPlayer?.id === player.id && player.id === user?.id;

    const renderPlayersList = () => (
        <PlayersListContainer>
            { players.map(p => (
                <PlayerItem
                    key={p.id}
                    active={isPlayerActive(p)}
                >
                    <CurrentPlayerIndicator
                        show={p.id === currentPlayer?.id}
                        loggedInPlayer={currentPlayer?.id === user?.id}
                    />
                    
                    <PlayerItemAvatar
                        src={p.avatar}
                    />

                    <PlayerName
                        active={isPlayerActive(p)}
                    >
                        { p?.name }
                    </PlayerName>
                    <PlayerPoints
                        active={isPlayerActive(p)}
                    >
                        { cards.filter(f => f.foundedBy === p?.id).length / 2 }
                    </PlayerPoints>
                </PlayerItem>
            )) }
        </PlayersListContainer>
    );

    const renderWinners = () => {
        if (!founded.length) return null;
        
        const foundedGrouped: {name: string,  count: number}[] = [];
        players.forEach(p => p && foundedGrouped.push({ name: p.name, count: founded.filter(f => f.foundedBy === p.id).length }));

        const sorted = foundedGrouped.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0);
        const winners = sorted.filter(s => sorted[0].count === s.count);

        return (
            <>
                <Modal
                    open={true}
                >
                    <WinnerTitle>
                        {(winners.length > 1 ? `It's a tie!` : `${ winners[0].name} Wins!`)}
                    </WinnerTitle>
                    <WinnerSubTitle>
                        Game over! Here are the results...
                    </WinnerSubTitle>
                    <WinnersList>
                        { sorted.map(w => ( 
                            <WinnerItem
                                key={w.name + '_winner'}
                                winner={winners.some(ww => ww.name === w.name)}
                            >
                                <WinnerName
                                    winner={winners.some(ww => ww.name === w.name)}
                                >
                                    { w.name }
                                </WinnerName>
                                <WinnerPoints
                                    winner={winners.some(ww => ww.name === w.name)}
                                >
                                    { w.count / 2 } pairs
                                </WinnerPoints>
                            </WinnerItem>
                        )) }
                    </WinnersList>
                    <WinnersButtonsContainer>
                        <WinnersButton
                            onClick={handleRestartGame}
                        >
                            Restart
                        </WinnersButton>
                        <WinnersButton
                            onClick={handleNewGame}
                            variant="opaque"
                        >
                            Setup New Game
                        </WinnersButton>
                    </WinnersButtonsContainer>
                </Modal>
            </>
        );
    };

    const handleRestartGame = async () => {
        setMenuOpen(false);
        const restarted = await restartGame(currentGameKey, cards);

        if (restarted) {
            setCurrentSelection(null);
            setFounded([]);
            handleGameEnded(false);
        }
    }

    const handleNewGame = async () => {
        history.push(`/new-game`);
    }

    useEffect(() => {
        changeCurrentGameKey((route.params as any).key);
    }, [])

    useEffect(() => {
        const gameRef = database.ref(`/games/${currentGameKey}`);
        
        gameRef.on('value', (game) => {
            const gameVal = game.val() as GameType;

            if (!gameVal) {
                history.push('/new-game');
                return;
            };

            setTheme(gameVal.theme);
            setGridSize(gameVal.gridSize);
            setCards([...gameVal.cards]);
            setPlayers([...gameVal.players]);
            setFounded([...gameVal.cards.filter(c => !!c.foundedBy)]);
            setCurrentPlayer({...gameVal.currentPlayer});
        });

        return () => gameRef.off('value');
    }, [currentGameKey])

    useEffect(() => {
        if (cards.length > 0 &&
            founded.length > 0 &&
            founded.length === cards.length) {
                handleGameEnded(true);
            }
    }, [cards, founded]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);        
    }, []);

    return (
        <Container>
            <HeaderContainer>
                <Title
                    variant="secondary"
                />
                <ButtonsContainer>
                    <HeaderButton
                        onClick={handleRestartGame}
                    >
                        Restart
                    </HeaderButton>
                    <HeaderButton
                        variant="opaque"
                        onClick={handleNewGame}
                    >
                        New Game
                    </HeaderButton>

                    <HeaderAvatar
                        src={user?.avatar}
                    />
                </ButtonsContainer>
                <MenuButton
                    onClick={() => setMenuOpen(o => !o)}
                    style={{
                    }}
                >
                    Menu
                </MenuButton>
            </HeaderContainer>

            { isMobile ? (
                <ModalMenu
                    open={menuOpen}
                >
                    <WinnersButton
                        variant="opaque"
                        onClick={handleRestartGame}
                    >
                        Restart
                    </WinnersButton>
                    <WinnersButton
                        variant="opaque"
                        onClick={handleNewGame}
                    >
                        Setup New Game
                    </WinnersButton>
                    <WinnersButton
                        onClick={() => setMenuOpen(false)}
                    >
                        Resume
                    </WinnersButton>
                </ModalMenu>

            ) : null }

            { gameEnded ? renderWinners() : renderGame() }
        </Container>
    )
}
