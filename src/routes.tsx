import { Switch, Router, Route, useHistory } from "react-router-dom";
import { Game } from "./Pages/Game";
import { Home } from './Pages/Home';

export const Routes = () => {
    const history = useHistory();

    const routes = [
        { id: 'home', path: '/', exact: true, component: Home },
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