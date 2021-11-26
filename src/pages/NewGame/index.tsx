import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { database } from '../../services/firebase';
import { useGameContext } from '../../contexts/game';
import { createGame, getCardsAsNumbers, joinExistingGame } from '../../services/game';

import {
    Container,
    ButtonsContainer,
    Row,
    RowTitle,
    ThemeButton,
    NumberButton,
    StartGameButton,
} from './styles';
import { GameType } from '../../types/GameType';

export const NewGame = () => {
    const [theme, setTheme] = useState<'Numbers' | 'Icons'>('Numbers');
    const [playersCount, setPlayersCount] = useState<number>(1);
    const [gridSize, setGridSize] = useState<number>(4);
    const history = useHistory();
    const { user, sigin } = useGameContext();

    const handleCreateGame = async () => {
        if (!user) await sigin();

        const newGamekey = await createGame(theme, gridSize, playersCount, user!);

        history.push(`/game/${newGamekey}`);
    };

    const handleJoinGame = async () => {
        const gameId = prompt('game id?');

        if (gameId) {
            const joined = await joinExistingGame(gameId, user!);
    
            if (joined) history.push(`/game/${gameId}`);
        }
    };

    return (
        <Container>
            <Title />
            <section>
                <Row>
                    <RowTitle>
                        Select Theme
                    </RowTitle>
                    <ButtonsContainer>
                        { ['Numbers', 'Icons'].map(t => (
                            <ThemeButton
                                key={t}
                                variant="secondary"
                                active={theme === t}
                                onClick={() => setTheme(t)}
                            >
                                { t }
                            </ThemeButton>
                        )) }
                    </ButtonsContainer>
                </Row>

                <Row>
                    <RowTitle>
                        Numbers of Players
                    </RowTitle>

                    <ButtonsContainer>
                        { [1, 2, 3, 4].map(number => (
                            <NumberButton
                                key={number}
                                variant='secondary'
                                active={playersCount === number}
                                onClick={() => setPlayersCount(number)}
                            >
                                {number}
                            </NumberButton>
                        )) }
                    </ButtonsContainer>
                </Row>

                <Row
                    style={{marginBottom: '32px'}}
                >
                    <RowTitle>
                        Grid Size
                    </RowTitle>
                    <ButtonsContainer>
                        { [4, 6].map(g => (
                            <ThemeButton
                                key={g}
                                variant="secondary"
                                active={gridSize === g}
                                onClick={() => setGridSize(g)}
                            >
                                {g}x{g}
                            </ThemeButton>
                        )) }
                    </ButtonsContainer>
                </Row>

                <Row>
                    <StartGameButton
                        onClick={handleCreateGame}
                    >
                        Start Game
                    </StartGameButton>
                    <StartGameButton
                        style={{
                            marginTop: '1rem',
                        }}
                        variant="secondary"
                        onClick={handleJoinGame}
                    >
                        Join Game
                    </StartGameButton>
                </Row>
            </section>
        </Container>
    )
}
