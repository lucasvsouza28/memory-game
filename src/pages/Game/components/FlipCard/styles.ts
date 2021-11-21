import styled from 'styled-components';

export const Container = styled.div`    
    position: relative;
    margin-bottom: 1rem;    
`;

type FlipCardProps = {
    active: boolean;
    pairFounded: boolean;
    blocked: boolean;
};

const FlipCard = styled.span<FlipCardProps>`
    cursor: ${ props => props.blocked ? 'not-allowed' : !props.pairFounded ? 'pointer' : 'inherit' };

    color: #FCFCFC;
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
    
    &:hover {
        filter: opacity(0.7);
    }

    width: 46px;
    height: 46px;

    @media(min-width: 82px) {
        width: 46px;
        height: 46px;
    }
`;

export const Back = styled(FlipCard)`
    transform: ${ props => props.active ? "rotateY(180deg)" : ""};
`;

export const Front = styled(FlipCard)`
    transform: ${ props => !props.active && !props.pairFounded ? "rotateY(180deg)" : ""};
`;
