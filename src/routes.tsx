import { Switch, Router, Route, useHistory } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from './pages/Home';
import { JoinGame } from "./pages/JoinGame";
import { Login } from "./pages/Login";
import { NewGame } from './pages/NewGame';

export const Routes = () => {
    const history = useHistory();

    const routes = [
        { id: 'login', path: '/', exact: true, component: Login },
        { id: 'home', path: '/home', component: Home },
        { id: 'new-game', path: '/new-game', component: NewGame },
        { id: 'game', path: '/game/:key', exact: true, component: Game },
        { id: 'join-game', path: '/game/:key/join', exact: true, component: JoinGame },
    ];

    return (
        <Router history={history}>
            <Switch>
                { routes.map(r => (
                    <Route
                        key={r.id}
                        path={r.path}
                        exact={r.exact}
                        component={r.component}
                    />
                )) }
            </Switch>
        </Router>
    );
}