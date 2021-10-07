import { UserInfoResponse } from 'api/types';
import type { Response } from 'express';

export const isUserAuth = (res: Response) => !!res.locals.isUserAuth;

export const setUserAuth = (res: Response) => {
    res.locals.isUserAuth = true;
};

export const getUserInfo = (res: Response) => res.locals.userInfo as UserInfoResponse;

export const setUserInfo = (res: Response, user: any) => {
    res.locals.userInfo = user;
};
