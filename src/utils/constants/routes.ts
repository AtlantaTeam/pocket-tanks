import { Main } from 'components/Pages/Main/Main';
import { Login } from 'components/Pages/Login/Login';
import { SignUp } from 'components/Pages/SignUp/SignUp';
import { Game } from 'components/Pages/Game/Game';
import { Profile } from 'components/Pages/Profile/Profile';
import { LeaderBoard } from 'components/Pages/LeaderBoard/LeaderBoard';
import { Forum } from 'components/Pages/Forum/Forum';

/* import { withAuthState } from '../../components/hoc/WithAuthState/WithAuthState';

export const ROUTES = [
    {
        name: 'Вход',
        link: '/login',
        component: withAuthState(false, '/profile', Login),

    },
    {
        name: 'Регистрация',
        link: '/signup',
        component: withAuthState(false, '/profile', SignUp),

    },
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
    // Должен быть последним для Switch
    {
        name: 'Главная страница',
        link: '/',
        component: Main,
    },
] as const;
 */

export const ROUTES = [
    {
        name: 'Вход',
        link: '/login',
        component: Login,

    },
    {
        name: 'Регистрация',
        link: '/signup',
        component: SignUp,

    },
    /*     {
        name: 'Игра',
        link: '/game',
        component: Game,

    }, */
    {
        name: 'Профиль',
        link: '/profile',
        component: Profile,

    },
    {
        name: 'Таблица результатов',
        link: '/leaderboard',
        component: LeaderBoard,

    },
    {
        name: 'Форум',
        link: '/forum',
        component: Forum,
    },
    // Должен быть последним для Switch
    {
        name: 'Главная страница',
        link: '/',
        component: Main,
    },
] as const;
