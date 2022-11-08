import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";

const RouteManager = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Registration} />
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouteManager;