import { objectToCamel } from 'ts-case-convert';
import { authAPI } from '../api/auth-api';

export class AuthController {
    public static async login(this: void, formData: FormData) {
        const response = await authAPI.login(formData);
        return response.data;
    }

    public static async signup(this: void, formData: FormData) {
        const response = await authAPI.signup(formData);
        return response.data;
    }

    public static async getUserInfo(this: void) {
        const response = await authAPI.getUserInfo();
        return objectToCamel(response.data);
    }

    public static async logout(this: void) {
        const response = await authAPI.logout();
        return response.data;
    }
}
