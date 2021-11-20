import { Switch, Router, Route, useHistory } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { NewGame } from './pages/NewGame';

export const Routes = () => {
    const history = useHistory();

    const routes = [
        { id: 'login', path: '/', exact: true, component: Login },
        { id: 'home', path: '/home', component: Home },
        { id: 'new-game', path: '/new-game', component: NewGame },
        { id: 'game', path: '/game', component: Game },
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