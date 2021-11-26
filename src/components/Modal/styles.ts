import styled from 'styled-components';

export const OuterContainer = styled.div<{ open: boolean }>`
    display: ${ props => props.open ? 'flex' : 'none' };
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
`;

export const Container = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    opacity: ${ props => props.open ? '1' : '0' };
    width: 90%;
    height: auto;
    background-color: #F2F2F2;
    border-radius: 10px;
    z-index: 100;
    padding: 24px;

    transition: all .3s linear;

    @media(min-width: 768px){
        width: 654px;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000000;
    mix-blend-mode: normal;
    opacity: 0.5;
    z-index: 90;
`;