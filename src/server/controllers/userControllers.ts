import type { NextFunction, Request, Response } from 'express';
import { setUserInfo } from 'server/utils/userLocals';
import { getUserServerToAPI } from 'server/utils/userServerToAPILocals';
import { objectToCamel } from 'ts-case-convert';

export const changeProfileController = (req: Request, res: Response, next: NextFunction) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI.changeProfile(req.body)
        .then((userInfo) => {
            setUserInfo(res, objectToCamel(userInfo.data));
            res.status(200);
            res.send(userInfo.data);
            return userInfo.data;
        })
        .catch((err) => next(err))
        .finally(() => {
            next();
        });
};

export const changeAvatarController = (req: Request, res: Response, next: NextFunction) => {

};

export const changePasswordController = (req: Request, res: Response, next: NextFunction) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI.changePassword(req.body)
        .then((response) => {
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => next(err))
        .finally(() => {
            next();
        });
};
