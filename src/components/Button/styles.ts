import styled from 'styled-components';

export const Container = styled.button<{
    type: 'primary' | 'secondary',
    active: boolean,
}>`
    cursor: pointer;
    background-color: ${ props => props.active ? (props.type === 'primary' ? '#FDA214' : '#304859') : '#BCCED9' };
    border-radius: 26px;
    outline: none;
    border: none;
    font-weight: bold;
    text-align: center;
    color: #FCFCFC;
    
    &:active {
        transform: scale(.9)
    }
    
    font-size: 16px;
    line-height: 20px;
    height: 40px;
    padding: 11px 0;

    @media(min-width: 768px) {
        font-size: 26px;
        line-height: 32px;
        height: 52px;
    }

`;
