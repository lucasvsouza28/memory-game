import styled from 'styled-components';

export const Container = styled.main`

    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
`;

export const MainSection = styled.section`
    
    width: 60%;
    border-radius: 29px;

    ul {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
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