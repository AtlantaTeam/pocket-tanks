import { HTTPService, httpToAPI, httpToServer } from '../modules/http-service/http-service';
import { AUTH_ROUTES } from '../constants/api-routes';
import type {
    EmptyResponse, IDResponse, OAuthServiceIdResponse, UserInfoResponse,
} from './types';
import { OAuthData } from './types';

export class AuthAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
    }

    getUserInfo() {
        return this.http.request.get<UserInfoResponse>(
            AUTH_ROUTES.GET_USER_INFO,
        );
    }

    getServiceId(redirectUri: string) {
        return this.http.request.get<OAuthServiceIdResponse>(
            `${AUTH_ROUTES.GET_OAUTH_SERVICE_ID}?redirect_uri=${redirectUri}`,
        );
    }

    loginWithOAuth(data: OAuthData) {
        return this.http.request.post<EmptyResponse>(
            AUTH_ROUTES.OAUTH_LOGIN,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    login(formData: FormData) {
        return this.http.request.post<EmptyResponse>(
            AUTH_ROUTES.LOGIN,
            formData,
            this.http.configFormDataAsJSON,
        );
    }

    signup(formData: FormData) {
        return this.http.request.post<IDResponse>(
            AUTH_ROUTES.SIGNUP,
            formData,
            this.http.configFormDataAsJSON,
        );
    }

    logout() {
        return this.http.request.post<EmptyResponse>(
            AUTH_ROUTES.LOGOUT,
        );
    }
}

export const authAPIDirectToAPI = new AuthAPI(httpToAPI);
export const authAPI = new AuthAPI(httpToServer);
