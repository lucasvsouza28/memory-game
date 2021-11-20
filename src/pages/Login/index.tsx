import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useHistory } from 'react-router';
import { Title } from '../../components/Title';
import { useGameContext } from '../../contexts/game';
import * as SC from './styles';

export const Login = () => {
    const {
        user,
        sigin,
    } = useGameContext();

    const history = useHistory();

    useEffect(() => {
        if (user) {
            history.push('/new-game');
        }
    }, [user])

    return (
        <>
            { //!user &&
            (
                <SC.Container>
                    <SC.FormContainer>
                        <Title />
                        <SC.LoginButton
                            onClick={sigin}
                        >
                            <FcGoogle size="32" />
                            Entre com Google
                        </SC.LoginButton>
                    </SC.FormContainer>
                </SC.Container>
            )}
        </>
    );
};
