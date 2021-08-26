import { http } from '../modules/http-service/http-service';
import { AUTH_ROUTES } from '../constants/api-routes';
import type { UserInfoResponse, UserIDResponse, EmptyResponse } from './types';

class AuthAPI {
    getUserInfo() {
        return http.request.get<UserInfoResponse>(
            AUTH_ROUTES.GET_USER_INFO,
        );
    }

    login(formData: FormData) {
        return http.request.post<EmptyResponse>(
            AUTH_ROUTES.LOGIN,
            formData,
            http.configFormDataAsJSON,
        );
    }

    signup(formData: FormData) {
        return http.request.post<UserIDResponse>(
            AUTH_ROUTES.SIGNUP,
            formData,
            http.configFormDataAsJSON,
        );
    }

    logout() {
        return http.request.post<EmptyResponse>(
            AUTH_ROUTES.LOGOUT,
        );
    }
}

export const authAPI = new AuthAPI();
