export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';

export const YANDEX_OAUTH_AUTHORIZE_URL = 'https://oauth.yandex.ru/authorize?response_type=code';
export const YANDEX_OAUTH_TOKEN = 'https://oauth.yandex.ru/token?grant_type=authorization_code';
export const YANDEX_OAUTH_CLIENT_ID = '887cdbde4dde4d469bb5b47a2f128288';
export const YANDEX_OAUTH_CLIENT_SECRET = '45b387d786eb45438b7758f0e601571f';
export const YANDEX_OAUTH_USER_INFO = 'https://login.yandex.ru/info';
export const YANDEX_OAUTH_AVATAR = 'https://avatars.yandex.net/get-yapic/:avatarId/islands-200';

const IS_DEV = process.env.NODE_ENV === 'development';
export const SERVER_DOMAIN = IS_DEV ? 'localhost:5000' : 'pocketanks.ru';
export const SERVER_URL = `https://${SERVER_DOMAIN}`;
export const YANDEX_REDIRECT_URI = `${SERVER_URL}/oauth/yandex`;

export const PRAKTIKUM_AUTH_ROUTES = {
    GET_USER_INFO: '/auth/user',
    LOGIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    GET_OAUTH_SERVICE_ID: '/oauth/yandex/service-id',
    OAUTH_LOGIN: '/oauth/yandex',
} as const;

export type AuthRoute = typeof PRAKTIKUM_AUTH_ROUTES[keyof typeof PRAKTIKUM_AUTH_ROUTES];

export const USER_ROUTES = {
    CHANGE_PROFILE: '/user/profile',
    CHANGE_AVATAR: '/user/profile/avatar',
    CHANGE_PASSWORD: '/user/password',
    GET_AVATAR: '/user/avatar',
    THEME: (id: number) => (`/user/${id}/theme`),
    LANG: (id: number) => (`/user/${id}/lang`),
} as const;

export type UserRoute = typeof USER_ROUTES[keyof typeof USER_ROUTES];

export const LEADER_BOARD_ROUTES = {
    ADD_USER_RESULTS: '/leaderboard',
    ADD: '/leaderboard/add',
    GET_ALL: '/leaderboard/all',
};

export const FORUM_ROUTES = {
    GET_ALL_THREADS: '/threads',
    GET_THREAD_MESSAGES: (id: number) => (`/thread/${id}/messages`),
    CREATE_THREAD: 'thread/create',
    CREATE_MESSAGE: 'message/create',
    UPDATE_MESSAGE_VOTE: (id: number) => (`/message/${id}/vote`),
};
