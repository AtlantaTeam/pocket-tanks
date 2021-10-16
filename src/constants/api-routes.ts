const { NODE_ENV } = process.env;

const IS_DEV = NODE_ENV === 'development';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';
export const OAUTH_AUTHORIZE_URL = 'https://oauth.yandex.ru/authorize?response_type=code';

// поменять при деплои в облако
export const SERVER_URL = IS_DEV ? 'https://localhost:5000' : 'https://pocketanks.herokuapp.com';

export const AUTH_ROUTES = {
    GET_USER_INFO: '/auth/user',
    LOGIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    GET_OAUTH_SERVICE_ID: '/oauth/yandex/service-id',
    OAUTH_LOGIN: '/oauth/yandex',
} as const;

export type AuthRoute = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];

export const USER_ROUTES = {
    CHANGE_PROFILE: '/user/profile',
    CHANGE_AVATAR: '/user/profile/avatar',
    CHANGE_PASSWORD: '/user/password',
} as const;

export const LEADER_BOARD_ROUTES = {
    ADD_USER_RESULTS: '/leaderboard',
    ADD: '/leaderboard/add',
    GET_ALL: '/leaderboard/all',
};

export type UserRoute = typeof USER_ROUTES[keyof typeof USER_ROUTES];
