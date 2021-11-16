import { useState, CSSProperties, ReactNode } from 'react'
import {
    Container,
    Back,
    Front,
} from './styles'

import {
    CardType
} from '../../../../types/Card';

type Props = {
    card: CardType;

    className?: string;
    style?: CSSProperties;
    children: ReactNode;

    pairFounded: boolean;

    onSelected: (card: CardType, clearSelection: () => void) => void;
}

export const FlipCard = ({
    card,

    children,
    className,
    style,
    pairFounded,

    onSelected
}: Props) => {
    const [active, setActive] = useState<boolean>(false);
    
    const handleActive = (card: CardType) => {
        if (pairFounded) return;

        setActive(!active);
        onSelected(card, () => {
            setActive(false);
        });
    }

    return (
        <Container
            className={className}
            style={style}
            onClick={() => handleActive(card)}
        >
            <Back
                active={active}
                pairFounded={pairFounded}
            />
            <Front
                active={active}
                pairFounded={pairFounded}
            >
                { children }
            </Front>

        </Container>
    )
}
