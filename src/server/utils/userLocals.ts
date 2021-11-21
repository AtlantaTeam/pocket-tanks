import type { Response } from 'express';
import { UserInfoResponse, YandexUserInfoResponse } from '../../api/types';

export const isUserAuth = (res: Response) => !!res.locals.isUserAuth;

export const setUserAuth = (res: Response) => {
    res.locals.isUserAuth = true;
};

export const deleteUserAuth = (res: Response) => {
    res.locals.isUserAuth = false;
};

export const getUserInfo = (res: Response) => res.locals.userInfo as UserInfoResponse;

export const setUserInfo = (res: Response, user: UserInfoResponse) => {
    res.locals.userInfo = user;
};

export const setYandexUserInfo = (res: Response, user: YandexUserInfoResponse) => {
    res.locals.userInfo = {
        ...user,
        email: user?.defaultEmail,
        secondName: user?.lastName,
        avatar: '',
    };
};
