import styled from 'styled-components';
import { Button } from '../../components/Button';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        
    height: 100vh;
`;

export const HeaderContainer = styled.header`
    display: flex;
    width: 80%;
    justify-content: space-between;
    `;

export const HeaderButton = styled(Button)`
    width: 125px;

    @media(min-width: 768px){
        font-size: 20px;
        line-height: 25px;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

type CardsContainerProps = {
    cols: number;
}

export const MainSection = styled.section<CardsContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`;

export const CardsContainer = styled.div<CardsContainerProps>`    
    width: ${props => props.cols === 4 ? '532px' : '572px'};

    ul {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(${ props => props.cols }, 1fr);
        grid-gap: 16px;
        width: 100%;
        
        li {
            list-style: none;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 60px;
            height: 60px;
        }
    }
`;

export const PlayersListContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 4rem;
    justify-content: space-between;
`;

type PlayerItemProps = {
    active: boolean;
}

export const PlayerItem = styled.div<PlayerItemProps>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${ props => props.active ? '#FDA214' : '#DFE7EC'};
    border-radius: 10px;
    
    @media(min-width: 768px){
        width: 255px;
        height: 72px;
        padding: 0 21px;
    }
`;

export const PlayerName = styled.div<PlayerItemProps>`
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.active ? '#FCFCFC' : '#7191A5'};
`;

export const PlayerPoints = styled.div<PlayerItemProps>`
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    color: ${props => props.active ? '#FCFCFC' : '#304859'};
`;

export const CurrentPlayerIndicator = styled.div<{ show: boolean, loggedInPlayer: boolean }>`
    display: ${ props => props.show ? 'block' : 'none' };
    position: absolute;
    top: -10%;
    right: 0;
    left: 0;
    margin: 0 auto;
    transform: rotate(45deg);

    width: 19px;
    height: 19px;
    background-color: ${ props => props.loggedInPlayer ? '#FDA214' : '#DFE7EC' };;
`;