import { http } from '../modules/http-service/http-service';
import { USER_ROUTES } from '../constants/api-routes';
import type { UserInfoResponse, EmptyResponse } from './types';

class UserAPI {
    changeProfile(formData: FormData) {
        return http.request.put<UserInfoResponse>(
            USER_ROUTES.CHANGE_PROFILE,
            formData,
            http.configFormDataAsJSON,
        );
    }

    changeAvatar(formData: FormData) {
        return http.request.put<UserInfoResponse>(
            USER_ROUTES.CHANGE_AVATAR,
            { data: formData },
        );
    }

    changePassword(formData: FormData) {
        return http.request.put<EmptyResponse>(
            USER_ROUTES.CHANGE_PASSWORD,
            formData,
            http.configFormDataAsJSON,
        );
    }
}

export const userAPI = new UserAPI();
