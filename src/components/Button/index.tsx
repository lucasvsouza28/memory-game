import { CSSProperties, ReactNode } from 'react';
import {
    Container
} from './styles';

type Props = {
    variant?: 'primary' | 'secondary' | 'opaque';
    active?: boolean;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: Function;
}

export const Button = ({
    variant = 'primary',
    active = true,
    children,
    className,
    style,
    onClick,
}: Props) => {
    return (
        <Container
            className={className}
            style={style}
            variant={variant}
            active={active}
            onClick={onClick}
        >
            { children }
        </Container>
    )
}
