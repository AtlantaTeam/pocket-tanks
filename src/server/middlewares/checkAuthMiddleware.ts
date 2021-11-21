import { NextFunction, Request, Response } from 'express';

import { UserAPI } from 'api/user-api';
import { setUserServerToAPI } from 'server/utils/userServerToAPILocals';
import {
    getUserInfo, setUserAuth, setUserInfo, setYandexUserInfo,
} from 'server/utils/userLocals';
import { objectToCamel } from 'ts-case-convert';
import { User } from 'db/models/User';
import { clearCookiesAndLocals } from 'server/controllers/authControllers';
import { YANDEX_OAUTH_AVATAR } from 'constants/api-routes';
import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';
import { setAuthServerToAPI } from '../utils/authServerToAPILocals';

export const checkAuth = () => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authCookieForAuth, uuidForAuth, yandexToken } = req.cookies;
    const authServerToAPI = new AuthAPI(httpToAPI);
    const userServerToAPI = new UserAPI(httpToAPI);
    if (authCookieForAuth && uuidForAuth) {
        httpToAPI
            .httpTransport
            .defaults.headers.Cookie = `authCookie=${authCookieForAuth as string}; uuid=${uuidForAuth as string}`;
        authServerToAPI
            .getUserInfo()
            .then((userInfo) => {
                setAuthServerToAPI(res, authServerToAPI);
                setUserServerToAPI(res, userServerToAPI);
                setUserInfo(res, objectToCamel(userInfo.data));
                const userData = objectToCamel(userInfo.data);
                return User.findOrCreate({
                    where: { remote_id: userData.id },
                    defaults: {
                        remote_id: userData.id,
                        name: userData.displayName || `${userData.firstName} ${userData.secondName}`,
                    },
                });
            }).then(([user]) => {
                setUserInfo(
                    res,
                    objectToCamel({
                        ...getUserInfo(res),
                        localId: user.id,
                    }),
                );
                setUserAuth(res);
                next();
                return true;
            })
            .catch((err) => next(err));
    } else if (yandexToken) {
        authServerToAPI.getOAuthYandexUserInfo(yandexToken)
            .then((userInfo) => {
                setAuthServerToAPI(res, authServerToAPI);
                setUserServerToAPI(res, userServerToAPI);
                setYandexUserInfo(res, objectToCamel(userInfo.data));
                const userData = objectToCamel(userInfo.data);
                return User.findOrCreate({
                    where: { yandex_id: userData?.id },
                    defaults: {
                        yandex_id: userData?.id,
                        yandex_token: yandexToken || '',
                        name: userData?.displayName
                            || `${userData?.firstName} ${userData?.lastName}`,
                    },
                });
            }).then(([user]) => {
                const userInfo = getUserInfo(res);
                setUserInfo(
                    res,
                    objectToCamel({
                        ...userInfo,
                        localId: user.id,
                        avatar: YANDEX_OAUTH_AVATAR.replace(':avatarId', userInfo.defaultAvatarId),
                        userProvider: 'yandex',
                    }),
                );
                setUserAuth(res);
                next();
                return true;
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    return clearCookiesAndLocals(res);
                }
                return next(err);
            });
    } else {
        setAuthServerToAPI(res, authServerToAPI);
        setUserServerToAPI(res, userServerToAPI);
        next();
    }
};
