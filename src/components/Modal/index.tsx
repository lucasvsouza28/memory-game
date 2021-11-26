import { CSSProperties, ReactNode } from 'react';
import * as SC from './styles';

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;

    open: boolean;
};

export const Modal = ({
    children,
    className,
    style,

    open,
}: Props) => {
    return (
        <SC.OuterContainer
            open={open}
        >
            { open && <SC.Overlay /> }

            <SC.Container
                className={className}
                style={style}
                open={open}
            >
                { children }
            </SC.Container>
        </SC.OuterContainer>
    )
}