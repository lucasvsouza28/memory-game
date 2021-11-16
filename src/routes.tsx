import { Switch, Router, Route, useHistory } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from './pages/Home';
import { NewGame } from './pages/NewGame';

export const Routes = () => {
    const history = useHistory();

    const routes = [
        { id: 'home', path: '/', exact: true, component: Home },
        { id: 'home', path: '/new-game', component: NewGame },
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