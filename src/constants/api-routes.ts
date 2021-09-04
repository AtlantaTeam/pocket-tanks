export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';

export const AUTH_ROUTES = {
    GET_USER_INFO: '/auth/user',
    LOGIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
} as const;

export type AuthRoute = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];

export const USER_ROUTES = {
    CHANGE_PROFILE: '/user/profile',
    CHANGE_AVATAR: '/user/profile/avatar',
    CHANGE_PASSWORD: '/user/password',
} as const;

export type UserRoute = typeof USER_ROUTES[keyof typeof USER_ROUTES];
