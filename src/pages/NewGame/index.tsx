import { useState } from 'react';
import { useHistory } from 'react-router';
import { Title } from '../../components/Title';

import {
    Container,
    ButtonsContainer,
    Row,
    RowTitle,
    ThemeButton,
    NumberButton,
    StartGameButton,
} from './styles';

export const NewGame = () => {
    const [theme, setTheme] = useState<'Numbers' | 'Icons'>('Numbers');
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const [gridSize, setGridSize] = useState<number>(4);
    const history = useHistory();

    const handleCreateGame = () => {
        history.push('/game');
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
                                type="secondary"
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
                                type='secondary'
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
                                type="secondary"
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
                </Row>
            </section>
        </Container>
    )
}
