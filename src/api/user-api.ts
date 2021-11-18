import { HTTPService, httpToServer } from '../modules/http-service/http-service';
import { USER_ROUTES } from '../constants/api-routes';
import type { UserInfoResponse, EmptyResponse, LangResponse } from './types';
import { ThemeResponse } from './types';

export class UserAPI {
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

    getUserAvatar() {
        return this.http.request.get<string>(
            USER_ROUTES.GET_AVATAR,
        );
    }

    getTheme(userId: number) {
        return this.http.request.get<ThemeResponse>(
            USER_ROUTES.THEME(userId),
        );
    }

    setTheme(userId: number, theme: string) {
        return this.http.request.post<EmptyResponse>(
            USER_ROUTES.THEME(userId),
            { theme },
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    getLang(userId: number) {
        return this.http.request.get<LangResponse>(
            USER_ROUTES.LANG(userId),
        );
    }

    setLang(userId: number, lang: string) {
        return this.http.request.post<EmptyResponse>(
            USER_ROUTES.LANG(userId),
            { lang },
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }
}

export const userAPI = new UserAPI(httpToServer);
