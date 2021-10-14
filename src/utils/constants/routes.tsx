import { Main } from 'components/Pages/Main/Main';
import { Login } from 'components/Pages/Login/Login';
import { SignUp } from 'components/Pages/SignUp/SignUp';
import Game from 'components/Pages/Game/Game';
import { Profile } from 'components/Pages/Profile/Profile';
import { LeaderBoard } from 'components/Pages/LeaderBoard/LeaderBoard';
import { Forum } from 'components/Pages/Forum/Forum';

import { withAuthState } from '../../components/hoc/WithAuthState/WithAuthState';

export const ROUTES = [
    {
        name: 'Вход',
        link: '/login',
        exact: true,
        component: withAuthState(false, '/profile', Login),

    },
    {
        name: 'Регистрация',
        link: '/signup',
        exact: true,
        component: withAuthState(false, '/profile', SignUp),

    },
    {
        name: 'Игра',
        link: '/game',
        exact: true,
        component: withAuthState(true, '/login', Game),

    },
    {
        name: 'Профиль',
        link: '/profile',
        exact: true,
        component: withAuthState(true, '/login', Profile),
    },
    {
        name: 'Таблица результатов',
        link: '/leaderboard',
        exact: true,
        component: withAuthState(true, '/login', LeaderBoard),

    },
    {
        name: 'Форум',
        link: '/forum',
        exact: true,
        component: withAuthState(true, '/login', Forum),
    },
    // Должен быть последним для Switch
    {
        name: 'Главная страница',
        link: '/',
        exact: true,
        component: Main,
    },
] as const;
