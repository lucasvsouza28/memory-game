import { useState, CSSProperties, ReactNode } from 'react'
import {
    Container,
    Back,
    Front,
} from './styles'

import {
    CardType
} from '../../../../types/Card';
import { database } from '../../../../services/firebase';

type Props = {
    gameKey: string;
    cards: CardType[];
    currentPlayerId: string | undefined;
    userId: string | undefined;

    card: CardType;

    className?: string;
    style?: CSSProperties;
    children: ReactNode;

    pairFounded: boolean;

    onSelected: (card: CardType, clearSelection: () => void) => void;
}

export const FlipCard = ({
    gameKey,
    cards,
    currentPlayerId,
    userId,

    card,

    children,
    className,
    style,
    pairFounded,

    onSelected
}: Props) => {    
    const handleActive = (card: CardType) => {
        if (currentPlayerId !== userId) return;

        if (pairFounded) return;
        
        const cardIndex = cards.findIndex(c => c.id === card.id);
        const cardRef = database.ref(`/games/${gameKey}/cards/${cardIndex}`)

        cardRef.update({ ...card, active: true });

        onSelected(card, () => {
            cardRef.update({ ...card, active: false });
        });
    }

    return (
        <Container
            className={className}
            style={style}
            onClick={() => handleActive(card)}
        >
            <Back
                active={card.active}
                pairFounded={pairFounded}
                blocked={currentPlayerId !== userId}
            />
            <Front
                active={card.active}
                pairFounded={pairFounded}
                blocked={currentPlayerId !== userId}
            >
                { children }
            </Front>

        </Container>
    )
}
