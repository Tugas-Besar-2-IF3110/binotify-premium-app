import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode'

import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";

import SongManagement from "./pages/SongManagement/SongManagement";
import AddSong from "./pages/SongManagement/AddSong";
import EditSong from "./pages/SongManagement/EditSong";

import SubscriptionList from "./pages/SubscriptionList/SubscriptionList";

const RouteManager = () => {
    const [cookies] = useCookies();

    const getToken = () => {
        if (cookies.binotify_premium_token) {
            let decodedToken: any;
            decodedToken = jwtDecode(cookies.binotify_premium_token);
            return decodedToken.isAdmin;
        }
        return null;
    }

    return (
        <Router>
            <Switch>
                {getToken() === true && <div>
                    <Route path="/" exact component={SubscriptionList} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </div>}

                {getToken() === false && <div>
                    <Route path="/" exact component={SongManagement} />
                    <Route path="/add-song" component={AddSong} />
                    <Route path="/edit-song/:id" component={EditSong} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </div>}

                {getToken() === null && <div>
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Registration} />
                    <Route path="*">
                        <Redirect to="/login" />
                    </Route>
                </div>}
            </Switch>
        </Router>
    )
}

export default RouteManager;