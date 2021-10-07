import axios from 'axios';
import type { Request, Response, NextFunction } from 'express';
import { authAPI } from 'api/auth-api';

import { setUserAuth, setUserInfo } from './utils/user';
import { cookieToString } from './utils/cookieToString';

export const checkAuth = () => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authCookie } = req.cookies;
    if (authCookie) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        axios.defaults.headers['Cookie'] = cookieToString(req.cookies);
        // eslint-disable-next-line promise/catch-or-return
        authAPI.getUserInfo()
            // eslint-disable-next-line promise/always-return
            .then((user) => {
                setUserAuth(res);
                setUserInfo(res, user);
            })
            .catch(() => {
                console.log('User not auth, cookie not valid');
            })
            .finally(() => {
                next();
            });
    } else {
        console.log('User not auth');
        next();
    }
};
