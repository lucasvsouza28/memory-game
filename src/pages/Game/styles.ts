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

export const Overlay = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: #000000;
    mix-blend-mode: normal;
    opacity: 0.5;
    z-index: 1;
`;

export const WinnersModal = styled.div`
    width: 90%;
    height: 488px;
    background-color: #F2F2F2;
    border-radius: 10px;
    z-index: 3;
    padding: 24px;

    @media(min-width: 768px){
        width: 654px;
    }
`;

export const WinnerTitle = styled.div`
    font-weight: bold;
    text-align: center;
    
    color: #152938;
    
    margin-bottom: 9px;

    font-size: 24px;
    line-height: 30px;

    @media(min-width: 768px){
        font-size: 48px;
        line-height: 60px;
    }    
`;

export const WinnerSubTitle = styled.div`
    font-weight: bold;   
    text-align: center;
    color: #7191A5;
    margin-bottom: 24px;

    font-size: 14px;
    line-height: 17px;

    @media(min-width: 768px){
        font-size: 18px;
        line-height: 22px;
    }
`;

export const WinnersList = styled.div`
    display: flex;
    flex-direction: column;
    
    gap: 8px;
    margin-bottom: 24px;

    @media(min-width: 768px) {
        gap: 16px;
        margin-bottom: 56px;
    }
`;

export const WinnerItem = styled.div<{ winner: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 16px;

    background-color: ${ props => props.winner ? '#152938' : '#DFE7EC'};
`;

export const WinnerName = styled.div<{ winner: boolean }>`
    font-weight: bold;    
    color: ${ props => props.winner ? '#FCFCFC' : '#7191A5' };

    font-size: 13px;
    line-height: 16px;

    @media(min-width: 768px) {
        font-size: 18px;
        line-height: 22px;
    }
`;

export const WinnerPoints = styled.div<{ winner: boolean }>`
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;

    text-align: right;
    color: ${ props => props.winner ? '#FCFCFC' : '#304859' };
`;

export const WinnersButtonsContainer = styled.div`
    display: flex;
    gap: 16px;

    flex-direction: column;

    @media(min-width: 768px){
        flex-direction: row;
    }
`;

export const WinnersButton = styled(Button)`
    flex: 1;
`;