import { CSSProperties, ReactNode } from 'react';
import {
    Container
} from './styles';

interface Props extends React.HTMLAttributes<HTMLElement> {
    variant?: 'primary' | 'secondary' | 'opaque';
    active?: boolean;
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
