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
import { Test } from 'components/Pages/Test/Test';

import '../../styles/fonts.css';

import './App.css';

export class App extends PureComponent {
    public render() {
        return (
            <div className="app">
                <Router>
                    <div>
                        <div>
                            <Game />
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <Link
                                        to="/"
                                        style={{ fontFamily: 'Play' }}
                                    >
                                        Главаная страница
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login">Вход</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Регистрация</Link>
                                </li>
                                <li>
                                    <Link to="/game">Игра</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Профиль</Link>
                                </li>
                                <li>
                                    <Link to="/leaderboard">
                                        Таблица результатов
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/forum">Форум</Link>
                                </li>
                                <li style={{ color: 'red' }}>
                                    <Link to="/test">Тест API</Link>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            <h1>Крутые ПокеТанчики.</h1>
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
                            <Route path="/test">
                                <Test />
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
    }
}
