import { BaseAPI } from './base-api';

class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile(formData: FormData) {
        return this.http.put('/profile', formData, this.configureFormAsJSON());
    }

    changeAvatar(formData: FormData) {
        return this.http.put('/profile/avatar', { data: formData });
    }

    changePassword(formData: FormData) {
        return this.http.put('/password', formData, this.configureFormAsJSON());
    }
}

export const userAPI = new UserAPI();
