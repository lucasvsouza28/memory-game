import styled from 'styled-components';

export const Container = styled.main`

    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
`;

export const MainSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    width: 60%;
    background-color: #FFF;
    border-radius: 29px;

    padding: 2rem 0;

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
            
            cursor: pointer;
            
            span {
                width: 60px;
                height: 60px;
                margin-bottom: 1rem;
                border-radius: 50%;
                background-color: pink;
                
                display: flex;
                align-items: center;
                justify-content: center;                
            }
            
        }
    }
`;
