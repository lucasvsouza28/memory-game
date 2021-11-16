import {
    useEffect,
    useState
} from 'react';
import { useGameContext } from '../../contexts/game';
import { CardType } from '../../types/Card';
import { FlipCard } from './components/FlipCard';

import {
    Container,
    MainSection,
    PlayersListContainer,
    PlayerItem,
} from './styles';

type GameProps = {
    type?: 'numbers' | 'icons';
    colsCount?: number;
    playersCount?: number;
};

type SelectedCardType = {
    card: CardType;
    clearSelection: () => void;
}

export const Game = ({
    type = 'numbers',
    colsCount = 6,
    playersCount = 1
}: GameProps) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [founded, setFounded] = useState<CardType[]>([]);
    const [currentSelection, setCurrentSelection] = useState<SelectedCardType | null>(null);

    const {
        players,
        currentPlayer,
        gameEnded,
        handleGameEnded,
        handleNextPlayer,
    } = useGameContext();

    const getCardsAsNumbers = () => {
        const newCards: CardType[] = [];
    
        const getNewNumber = (seed: number): number => Math.floor(Math.random() * seed);
    
        for (let i = 0; i < (colsCount * colsCount) / 2; i++) {
            let number = getNewNumber(colsCount * colsCount);
            
            while(newCards.some(c => c.number === number)) number = getNewNumber(colsCount * colsCount);
    
            const newCard: CardType = { key: number.toString(), number, selected: false};
    
            newCards.push({ ...newCard });
            newCards.push({ ...newCard });
        }
    
        // TODO: embaralhar itens

        setCards([...newCards]);
    }

    const handleCardSelected = (card: CardType, clearSelection: () => void) => {

        if (!currentSelection)
        {
            setCurrentSelection({ card: { ...card }, clearSelection });
            return;
        }

        if (currentSelection.card.key === card.key) {
            setFounded(c => [
                ...c,
                { ...card, foundedBy: currentPlayer?.name }
            ]);
            
            setCurrentSelection(null);
            handleNextPlayer(); 
            return;
        } else {
            setTimeout(() => {
                currentSelection.clearSelection();
                clearSelection();
    
                setCurrentSelection(null);
                handleNextPlayer();
                //return;
            }, 700);
            
        }
    }

    const renderGame = () => (
        <MainSection
            cols={colsCount}
        >
            <ul>
                { cards.map((c, i) => (
                    <li
                        key={c.number + '_' + i}
                    >
                        <FlipCard
                            card={c}
                            pairFounded={founded.some(f => f.number === c.number)}
                            onSelected={handleCardSelected}>
                            { c.number }
                        </FlipCard>
                    </li>
                )) }
            </ul>
            
            { players.length > 0 && renderPlayersList() }
        </MainSection>
    );

    const renderPlayersList = () => (
        <PlayersListContainer>
            { players.map(p => (
                <PlayerItem
                    key={p.id}
                    active={currentPlayer?.id === p.id}
                >
                    { p?.name } - { founded.filter(f => f.foundedBy === p?.name).length }
                </PlayerItem>
            )) }
        </PlayersListContainer>
    );

    const renderWinner = () => {
        const players = new Set(founded.map(f => f.foundedBy));
        const foundedGrouped: {name: string,  count: number}[] = [];
        players.forEach(p => p && foundedGrouped.push({ name: p, count: founded.filter(f => f.foundedBy === p).length }));

        const sorted = foundedGrouped.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0);
        const winners = sorted.filter(s => sorted[0].count === s.count);

        return (
            <>
                { `${ (winners.length === 1 ? 'The winner is ' : `It's a draw between: `)} ${ winners.map(w => w.name).join(', ') }` }
            </>
        );
    };

    useEffect(() => {
        if (type === 'numbers') getCardsAsNumbers();
    }, [type, colsCount]);

    useEffect(() => {
        if (cards.length > 0 &&
            founded.length > 0 &&
            founded.length === cards.length / 2) {
                handleGameEnded(true);
            }
    }, [cards, founded]);

    return (
        <Container>
            { gameEnded ? renderWinner() : renderGame() }
        </Container>
    )
}
