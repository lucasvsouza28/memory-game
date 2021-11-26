import styled from 'styled-components';
import { Button } from '../../components/Button';

export const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
    width: 100vw;
    height: 100vh;
    background-color: #152938;

    section {
        background-color: #FCFCFC;
        border-radius: 20px;
        
        padding: 24px;
        width: 327px;
        min-height: 386px;

        @media(min-width: 768px) {
            padding: 56px;
            min-height: 559px;
            width: 654px;
        }
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Row = styled.div`    

    margin-bottom: 32px;
`;

export const RowTitle = styled.h3`
    width: 100%;
    font-weight: bold;
    color: #7191A5;
    margin-bottom: 11px;
    font-size: 15px;
    line-height: 19px;
    
    @media(min-width: 768px) {
        margin-bottom: 16px;
        font-size: 20px;
        line-height: 25px;
    }
`;

const NewGameButton = styled(Button)`
    @media(min-width: 768px){
        font-size: 26px;
        line-height: 32px;
        width: 256px;
    }
`;

export const ThemeButton = styled(NewGameButton)`
    width: 134px;

    @media(min-width: 768px){
        width: 256px;
    }
`;

export const NumberButton = styled(NewGameButton)`
    width: 62px;

    @media(min-width: 768px){
        width: 119px;
    }
`;

export const StartGameButton = styled(Button)`
    width: 100%;

    font-size: 18px;
    line-height: 22px;

    @media(min-width: 768px){
        font-size: 32px;
        line-height: 40px;
    }
`;