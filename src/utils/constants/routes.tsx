import { Main } from 'components/Pages/Main/Main';
import { Login } from 'components/Pages/Login/Login';
import { SignUp } from 'components/Pages/SignUp/SignUp';
import Game from 'components/Pages/Game/Game';
import { Profile } from 'components/Pages/Profile/Profile';
import { LeaderBoard } from 'components/Pages/LeaderBoard/LeaderBoard';
import { Forum } from 'components/Pages/Forum/Forum';

import { withAuthState } from '../../components/hoc/WithAuthState/WithAuthState';

// Должен быть последним для Switch
export const MAIN_ROUTE = {
    name: 'Главная страница',
    link: '/',
    component: Main,
};

export const ROUTES = [
    {
        name: 'Игра',
        link: '/game',
        component: withAuthState(true, '/login', Game),

    },
    {
        name: 'Профиль',
        link: '/profile',
        component: withAuthState(true, '/login', Profile),
    },
    {
        name: 'Таблица результатов',
        link: '/leaderboard',
        component: withAuthState(true, '/login', LeaderBoard),

    },
    {
        name: 'Форум',
        link: '/forum',
        component: withAuthState(true, '/login', Forum),
    },
] as const;

export const AUTH_MENU_ROUTES = [{
    name: 'Вход',
    link: '/login',
    component: withAuthState(false, '/profile', Login),

},
{
    name: 'Регистрация',
    link: '/signup',
    component: withAuthState(false, '/profile', SignUp),

}] as const;
