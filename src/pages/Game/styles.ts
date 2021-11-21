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
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;

    @media(min-width: 768px) {
        width: 80%;
    }
`;

export const HeaderButton = styled(Button)`
    width: 125px;

    @media(min-width: 768px){
        font-size: 20px;
        line-height: 25px;
    }
`;

export const HeaderAvatar = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    align-self: center;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
`;

type CardsContainerProps = {
    cols: number;
}

export const MainSection = styled.section<CardsContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;

    @media(min-width: 768px) {
        width: 80%;
    }
`;

export const CardsContainer = styled.div<CardsContainerProps>`    
    width: 327px;

    @media(min-width: 768px){
        width: ${props => props.cols === 4 ? '532px' : '572px'};
    }

    ul {
        display: grid;
        justify-content: space-between;
        justify-items: center;
        grid-template-columns: repeat(${ props => props.cols }, 1fr);
        
        
        width: 100%;

        grid-gap: ${ props => props.cols === 4 ? '12px' : '9px' };

        @media(min-width: 768px){
            grid-gap: ${ props => props.cols === 4 ? '20px' : '16 px' };
        }
        
        li {
            list-style: none;
            
            display: flex;
            align-items: center;
            
            width: 46px;
            height: 46px;

            @media(min-width: 82px) {
                width: 46px;
                height: 46px;
            }
        }
    }
`;

export const PlayersListContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 83px;
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

    flex-direction: column;
    width: 64px;
    height: 70px;
    padding: 5px 0;
    
    @media(min-width: 768px){
        flex-direction: row;
        width: 164px;
        height: 80px;
        padding: 0 21px;
    }

    @media(min-width: 1024px){
        width: 255px;
        height: 72px;
    }
`;

export const PlayerName = styled.div<PlayerItemProps>`
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.active ? '#FCFCFC' : '#7191A5'};

    display: none;

    @media(min-width: 768px){
        display: block;
    }
`;

export const PlayerPoints = styled.div<PlayerItemProps>`
    font-weight: bold;
    color: ${props => props.active ? '#FCFCFC' : '#304859'};

    font-size: 24px;
    line-height: 30px;

    @media(min-width: 768px) {
        font-size: 32px;
        line-height: 40px;        
    }
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

export const PlayerItemAvatar = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    z-index: 2;
`;