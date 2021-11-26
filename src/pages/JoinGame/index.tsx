import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Title } from "../../components/Title";
import { useGameContext } from "../../contexts/game";
import { joinExistingGame } from "../../services/game";
import * as SC from './styles';

export const JoinGame = ({

}) => {
    const [gameFull, setGameFull] = useState<boolean>(false);
    const route = useRouteMatch();
    const history = useHistory();
    const {
        changeCurrentGameKey,
        user,
    } = useGameContext();

    useEffect(() => {

        const join = async () => {
            const key = (route.params as any).key;
            if (key){
                const joined = await joinExistingGame(key, user!);

                if (joined) {
                    history.push(`/game/${key}`);
                } else {
                    setGameFull(true);
                }
            }
        }

        join();
    }, [])

    return (
        <SC.Container>
            <Title variant="secondary" />
            { gameFull && <SC.Message>Game's already full 😢</SC.Message>  }
        </SC.Container>
    )
}
