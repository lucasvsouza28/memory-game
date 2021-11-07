import {
    useEffect,
    useState
} from 'react';

import {
    Container,
    MainSection,
} from './styles';

type Card = {
    number: number;
    selected: boolean;    
};

type GameProps = {
    colsCount: number;
    playersCount: number;
};

export const Game = ({
    colsCount = 6,
    playersCount
}: GameProps) => {
    const [cards, setCards] = useState<Card[]>([]);

    const getCardsAsNumbers = () => {
        const newCards: Card[] = [];
    
        const getNewNumber = (seed: number): number => Math.floor(Math.random() * seed);
    
        for (let i = 0; i < (colsCount * colsCount) / 2; i++) {
            let number = getNewNumber(colsCount * colsCount);
            
            while(newCards.some(c => c.number === number)) number = getNewNumber(colsCount * colsCount);
    
            const newCard: Card = { number, selected: false};
    
            newCards.push({ ...newCard });
            newCards.push({ ...newCard });
        }
    
        // TODO: embaralhar itens

        setCards([...newCards]);
    }

    useEffect(() => {
        getCardsAsNumbers();
    }, [colsCount])
    
    return (
        <Container>
            <MainSection>
                <ul>
                    { cards.map((c, i) => (
                        <li
                            key={c.number + '_' + i}
                        >
                                <span className="front">
                                    { c.number }
                                </span>
                        </li>
                    )) }
                </ul>
            </MainSection>
        </Container>
    )
}
