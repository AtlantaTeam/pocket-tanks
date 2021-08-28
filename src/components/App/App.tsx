import React, { PureComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import { Forum } from 'components/Pages/Forum/Forum';
import { Game } from 'components/Pages/Game/Game';
import { LeaderBoard } from 'components/Pages/LeaderBoard/LeaderBoard';
import { Login } from 'components/Pages/Login/Login';
import { Main } from 'components/Pages/Main/Main';
import { Profile } from 'components/Pages/Profile/Profile';
import { SignUp } from 'components/Pages/SignUp/SignUp';

import '../../styles/fonts.css';
import '../../../static/index.css';

import './App.css';
import { MenuComponent } from 'components/components/Menu/Menu';

export const App = () => (
    <div className="app">
        <Router>
            <MenuComponent />
            <div>
                <div>
                    <Game />
                </div>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/game">
                        <Game />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/leaderboard">
                        <LeaderBoard />
                    </Route>
                    <Route path="/forum">
                        <Forum />
                    </Route>
                    <Route path="/">
                        <ErrorBoundary>
                            <Main />
                        </ErrorBoundary>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
);
