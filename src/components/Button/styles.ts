import styled from 'styled-components';

type Props = {
    variant?: 'primary' | 'secondary' | 'opaque';
    active: boolean;
}

export const Container = styled.button<Props>`
    display: flex;
    align-items: center;
    justify-content:center;
    cursor: pointer;
    background-color: ${ props => props.active ? (props.variant === 'primary' ? '#FDA214' : props.variant === 'secondary' ? '#304859' : '#DFE7EC') : '#BCCED9' };
    border-radius: 26px;
    outline: none;
    border: none;
    font-weight: bold;
    text-align: center;
    color: ${ props => props.variant !== 'opaque' ? '#FCFCFC' : '#304859' };
    
    &:active {
        transform: scale(.98)
    }
    
    &:hover{
        filter: opacity(0.7);
    }

    font-size: 16px;
    line-height: 20px;
    height: 40px;
    padding: 11px 0;

    @media(min-width: 768px) {
        font-size: 20px;
        line-height: 25px;
        height: 52px;
    }
`;
