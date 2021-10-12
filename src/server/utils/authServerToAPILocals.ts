import { AuthAPI } from 'api/auth-api';
import type { Response } from 'express';
import { httpToAPI } from 'modules/http-service/http-service';

export const setAuthServerToAPI = (res: Response, authApi: AuthAPI) => {
    res.locals.authServerToAPI = authApi;
};

export const getAuthServerToAPI = (res: Response): AuthAPI => {
    if (res.locals.authServerToAPI !== undefined) {
        return res.locals.authServerToAPI as AuthAPI;
    }
    return new AuthAPI(httpToAPI);
};
