import { match } from 'react-router';
import { Main } from 'components/Pages/Main/Main';
import { Login } from 'components/Pages/Login/Login';
import { SignUp } from 'components/Pages/SignUp/SignUp';
import Game from 'components/Pages/Game/Game';
import { Profile } from 'components/Pages/Profile/Profile';
import { LeaderBoard } from 'components/Pages/LeaderBoard/LeaderBoard';
import { Forum } from 'components/Pages/Forum/Forum';
import { Store } from 'redux';
import { withAuthState } from '../../components/hoc/WithAuthState/WithAuthState';
import { avatarRequested } from '../../redux/actions/user-state/get-avatar';

export type RouterFetchDataArgs = {
    storeItem: Store;
    match: match<{ slug: string }>;
};

export type Route = {
    name: string;
    path: string;
    exact: boolean;
    component: JSX.Element,
};

// Должен быть последним для Switch
export const MAIN_ROUTE = {
    name: 'Главная страница',
    path: '/',
    exact: true,
    component: Main,
};

export const ROUTES = [
    {
        name: 'Игра',
        path: '/game',
        exact: true,
        component: withAuthState(true, '/login', Game),
        fetchData(data: RouterFetchDataArgs) {
            const { dispatch } = data.storeItem;
            dispatch(avatarRequested(data.storeItem));
        },
    },
    {
        name: 'Профиль',
        path: '/profile',
        exact: true,
        component: withAuthState(true, '/login', Profile),
        fetchData(data: RouterFetchDataArgs) {
            const { dispatch } = data.storeItem;
            dispatch(avatarRequested(data.storeItem));
        },
    },
    {
        name: 'Таблица результатов',
        path: '/leaderboard',
        exact: true,
        component: withAuthState(true, '/login', LeaderBoard),

    },
    {
        name: 'Форум',
        path: '/forum',
        exact: true,
        component: withAuthState(true, '/login', Forum),
    },
] as const;

export const AUTH_MENU_ROUTES = [{
    name: 'Вход',
    path: '/login',
    exact: true,
    component: withAuthState(false, '/profile', Login),

},
{
    name: 'Регистрация',
    path: '/signup',
    exact: true,
    component: withAuthState(false, '/profile', SignUp),

}] as const;
