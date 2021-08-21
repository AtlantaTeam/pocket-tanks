import { BaseAPI } from './base-api';

class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    getUserInfo() {
        return this.http.get('/user');
    }

    login(formData: FormData) {
        return this.http.post('/signin', this.configureFormAsJSON(formData));
    }

    signup(formData: FormData) {
        return this.http.post('/signup', this.configureFormAsJSON(formData));
    }

    logout() {
        return this.http.post('/logout');
    }
}

export const authAPI = new AuthAPI();
