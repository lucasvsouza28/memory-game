import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { database } from '../../services/firebase';
import { useGameContext } from '../../contexts/game';
import { getCardsAsNumbers } from '../../services/game';

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
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const [gridSize, setGridSize] = useState<number>(4);
    const history = useHistory();
    const { user, sigin } = useGameContext();

    const handleCreateGame = async () => {
        if (!user) await sigin();

        const roomsRef = database.ref('/games');

        const newRoom = await roomsRef.push({
            gridSize,
            cards: theme === 'Numbers' ? await getCardsAsNumbers(gridSize) : new Error('Not implemented'),
            closed: false,
            foundedCards: [],
            players: [{ ...user }],
            currentPlayer: {...user},
        } as GameType);

        history.push(`/game/${newRoom.key}`);
    };

    const handleJoinGame = async () => {
        const gameId = prompt('game id?');
        const playersRef = database.ref('/games/' + gameId + '/players');
        const players = (await playersRef.get()).val();

        playersRef.update([...players, user]);

        history.push('/game/' + gameId);
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
                                active={numberOfPlayers === number}
                                onClick={() => setNumberOfPlayers(number)}
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
                    <Button
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                        variant="secondary"
                        onClick={handleJoinGame}
                    >
                        Join Game
                    </Button>
                </Row>
            </section>
        </Container>
    )
}
