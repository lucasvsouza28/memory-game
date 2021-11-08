import {
    useEffect,
    useState
} from 'react';
import { CardType } from '../../types/Card';
import { FlipCard } from './components/FlipCard';

import {
    Container,
    MainSection,
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

    const [currentPlayer, setCurrentPlayer] = useState({
        name: 'lusca'
    });

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
                { ...card, foundedBy: currentPlayer.name }
            ]);
            
            setCurrentSelection(null);

            return;
        } else {
            setTimeout(() => {
                currentSelection.clearSelection();
                clearSelection();
    
                setCurrentSelection(null);
            }, 1000);

            return;
        }
        
    }

    useEffect(() => {
        if (type === 'numbers') getCardsAsNumbers();
    }, [type, colsCount])
    
    return (
        <Container>
            <MainSection>
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
                <div style={{
                    marginTop: '2rem'
                }}>
                    Player { currentPlayer.name } has { founded.filter(f => f.foundedBy === currentPlayer.name).length } points
                </div>
            </MainSection>
        </Container>
    )
}
