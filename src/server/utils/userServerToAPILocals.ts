import { UserAPI } from 'api/user-api';
import type { Response } from 'express';
import { httpToAPI } from 'modules/http-service/http-service';

export const setUserServerToAPI = (res: Response, userApi: UserAPI) => {
    res.locals.userServerToAPI = userApi;
};

export const getUserServerToAPI = (res: Response): UserAPI => {
    if (res.locals.authServerToAPI !== undefined) {
        return res.locals.userServerToAPI as UserAPI;
    }
    return new UserAPI(httpToAPI);
};

export const deleteUserServerToAPI = (res: Response) => {
    res.locals.userServerToAPI = undefined;
};
