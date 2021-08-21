import { authAPI } from '../api/auth-api';

export class AuthController {
    public static async login(formData: FormData) {
        const response = await authAPI.login(formData);
        return response;
    }

    public static async signup(formData: FormData) {
        const response = await authAPI.signup(formData);
        return response;
    }

    public static async getUserInfo() {
        const response = await authAPI.getUserInfo();
        return response;
    }

    public static async logout() {
        const response = await authAPI.logout();
        return response;
    }
}
