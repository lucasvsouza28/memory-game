import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    margin-bottom: 1rem;    
`;

type FlipCardProps = {
    active: boolean;
    pairFounded: boolean;
};

const FlipCard = styled.span<FlipCardProps>`
    cursor: ${ props => !props.pairFounded ? 'pointer' : 'initial' };

    color: #FCFCFC;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    background-color: ${ props => props.pairFounded ? '#FDA214' : ( props.active ? '#BCCED9' : '#304859' ) };
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;                
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: all 0.3s linear;
`;

export const Back = styled(FlipCard)`
    transform: ${ props => props.active ? "rotateY(180deg)" : ""};
`;

export const Front = styled(FlipCard)`
    transform: ${ props => !props.active ? "rotateY(180deg)" : ""};
`;
