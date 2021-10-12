import { httpToAPI, HTTPService } from '../modules/http-service/http-service';
import { USER_ROUTES } from '../constants/api-routes';
import type { UserInfoResponse, EmptyResponse } from './types';

class UserAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
    }

    changeProfile(formData: FormData) {
        return this.http.request.put<UserInfoResponse>(
            USER_ROUTES.CHANGE_PROFILE,
            formData,
            this.http.configFormDataAsJSON,
        );
    }

    changeAvatar(formData: FormData) {
        return this.http.request.put<UserInfoResponse>(
            USER_ROUTES.CHANGE_AVATAR,
            formData,
        );
    }

    changePassword(formData: FormData) {
        return this.http.request.put<EmptyResponse>(
            USER_ROUTES.CHANGE_PASSWORD,
            formData,
            this.http.configFormDataAsJSON,
        );
    }
}

export const userAPI = new UserAPI(httpToAPI);
