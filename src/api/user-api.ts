import { BaseAPI } from './base-api';

class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile(formData: FormData) {
        return this.http.put('/profile', this.configureFormAsJSON(formData));
    }

    changeAvatar(formData: FormData) {
        return this.http.put('/profile/avatar', { data: formData });
    }

    changePassword(formData: FormData) {
        return this.http.put('/password', this.configureFormAsJSON(formData));
    }
}

export const userAPI = new UserAPI();
