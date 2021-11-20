import styled from 'styled-components';
import { Button } from '../../components/Button';

export const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #304859;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginButton = styled(Button)`
    gap: 1rem;
    padding: 0 1rem;
`;
