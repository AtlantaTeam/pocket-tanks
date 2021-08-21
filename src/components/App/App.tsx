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

import './App.css';

export class App extends PureComponent {
    public render() {
        return (
            <div className="app">
                <Router>
                    <div>
<<<<<<< HEAD
                        <div>
                            <Game />
                        </div>
=======
>>>>>>> основные элементы дизайн системы
                        <nav>
                            <ul>
                                <li>
                                    <Link
                                        to="/"
<<<<<<< HEAD
                                        style={{ fontFamily: 'Play' }}
=======
                                        style={{
                                            fontFamily:
                                                'Play',
                                        }}
>>>>>>> основные элементы дизайн системы
                                    >
                                        Главаная страница
                                    </Link>
                                </li>
                                <li>
<<<<<<< HEAD
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
=======
                                    <Link to="/login">
                                        Вход
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        Регистрация
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/game">
                                        Игра
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        Профиль
                                    </Link>
>>>>>>> основные элементы дизайн системы
                                </li>
                                <li>
                                    <Link to="/leaderboard">
                                        Таблица результатов
                                    </Link>
                                </li>
                                <li>
<<<<<<< HEAD
                                    <Link to="/forum">Форум</Link>
                                </li>
                            </ul>
                        </nav>
=======
                                    <Link to="/forum">
                                        Форум
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            <h1>Крутые ПокеТанчики.</h1>
                            <img src={img} alt="Tank" />
                        </div>
>>>>>>> основные элементы дизайн системы
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
    }
}
