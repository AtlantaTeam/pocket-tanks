import axios from 'axios';
import { HTTPService, httpToAPI, httpToServer } from '../modules/http-service/http-service';
import {
    GOOGLE_OAUTH_TOKEN,
    GOOGLE_OAUTH_USER_INFO,
    GOOGLE_REDIRECT_URI,
    PRAKTIKUM_AUTH_ROUTES,
    YANDEX_OAUTH_TOKEN,
    YANDEX_OAUTH_USER_INFO,
    YANDEX_REDIRECT_URI,
} from '../constants/api-routes';
import type {
    EmptyResponse,
    GoogleUserInfoResponse,
    IDResponse,
    OAuthServiceIdResponse,
    UserInfoResponse,
} from './types';
import { OAuthData, OAuthTokenResponse, YandexUserInfoResponse } from './types';

export class AuthAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
    }

    getUserInfo() {
        return this.http.request.get<UserInfoResponse>(
            PRAKTIKUM_AUTH_ROUTES.GET_USER_INFO,
        );
    }

    getServiceId(redirectUri: string) {
        return this.http.request.get<OAuthServiceIdResponse>(
            `${PRAKTIKUM_AUTH_ROUTES.GET_OAUTH_SERVICE_ID}?redirect_uri=${redirectUri}`,
        );
    }

    loginWithOAuthPraktikum(data: OAuthData) {
        return this.http.request.post<EmptyResponse>(
            PRAKTIKUM_AUTH_ROUTES.OAUTH_LOGIN,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    getOAuthGoogleToken(code: string) {
        return axios.post<OAuthTokenResponse>(
            GOOGLE_OAUTH_TOKEN,
            (new URLSearchParams(`grant_type=authorization_code&code=${code}`
                + `&client_id=${process.env.GOOGLE_CLIENT_ID || ''}`
                + `&client_secret=${process.env.GOOGLE_CLIENT_SECRET || ''}`
                + `&redirect_uri=${GOOGLE_REDIRECT_URI}`)),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            },
        );
    }

    getOAuthGoogleUserInfo(token: string) {
        return axios.get<GoogleUserInfoResponse>(
            GOOGLE_OAUTH_USER_INFO,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    }

    getOAuthYandexToken(code: string) {
        return axios.post<OAuthTokenResponse>(
            YANDEX_OAUTH_TOKEN,
            (new URLSearchParams(`grant_type=authorization_code&code=${code}`
                + `&client_id=${process.env.YANDEX_CLIENT_ID || ''}`
                + `&client_secret=${process.env.YANDEX_CLIENT_SECRET || ''}`
                + `&redirect_uri=${YANDEX_REDIRECT_URI}`)),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            },
        );
    }

    getOAuthYandexUserInfo(token: string) {
        return axios.get<YandexUserInfoResponse>(
            YANDEX_OAUTH_USER_INFO,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    Authorization: `OAuth ${token}`,
                },
            },
        );
    }

    login(formData: FormData) {
        return this.http.request.post<EmptyResponse>(
            PRAKTIKUM_AUTH_ROUTES.LOGIN,
            formData,
            this.http.configFormDataAsJSON,
        );
    }

    signup(formData: FormData) {
        return this.http.request.post<IDResponse>(
            PRAKTIKUM_AUTH_ROUTES.SIGNUP,
            formData,
            this.http.configFormDataAsJSON,
        );
    }

    logout() {
        return this.http.request.post<EmptyResponse>(
            PRAKTIKUM_AUTH_ROUTES.LOGOUT,
        );
    }
}

export const authAPIDirectToAPI = new AuthAPI(httpToAPI);
export const authAPI = new AuthAPI(httpToServer);
