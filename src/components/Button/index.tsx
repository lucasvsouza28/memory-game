import { CSSProperties, ReactNode } from 'react';
import {
    Container
} from './styles';

type Props = {
    type?: 'primary' | 'secondary';
    active?: boolean;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: Function;
}

export const Button = ({
    type = 'primary',
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
            type={type}
            active={active}
            onClick={onClick}
        >
            { children }
        </Container>
    )
}
