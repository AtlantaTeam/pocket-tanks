import { httpToServer, HTTPService } from '../modules/http-service/http-service';
import { AUTH_ROUTES } from '../constants/api-routes';
import type { UserInfoResponse, IDResponse, EmptyResponse } from './types';

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

export const authAPI = new AuthAPI(httpToServer);
