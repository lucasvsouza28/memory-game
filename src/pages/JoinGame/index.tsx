import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Button } from "../../components/Button";
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
        user,
        changeCurrentGameKey,
        currentGameKey,
    } = useGameContext();

    useEffect(() => {
        const key = (route.params as any).key;
        
        const join = async () => {
            if (user && key) {
                const joined = await joinExistingGame(key, user!)
                changeCurrentGameKey(key);

                if (joined) {
                    history.push(`/game/${key}`);
                } else {
                    setGameFull(true);
                }
            }
        }

        join();

    }, [user])

    return (
        <SC.Container>
            <Title variant="secondary" />
            { gameFull &&
                <>
                    <SC.Message>
                        Game's already full 😢 .. but ...
                    </SC.Message>
                    <Button
                        onClick={() => history.push(`/game/${currentGameKey}`)}
                        style={{
                            paddingLeft: '21px' ,
                            paddingRight: '21px' 
                        }}
                    >You can spectate</Button>
                </>
            }
        </SC.Container>
    )
}
