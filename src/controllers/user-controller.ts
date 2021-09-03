import { objectToCamel } from 'ts-case-convert';
import { userAPI } from '../api/user-api';

export class UserController {
    public static async changeProfile(this: void, formData: FormData) {
        const response = await userAPI.changeProfile(formData);
        return objectToCamel(response.data);
    }

    public static async changeAvatar(this: void, formData: FormData) {
        const response = await userAPI.changeAvatar(formData);
        return objectToCamel(response.data);
    }

    public static async changePassword(this: void, formData: FormData) {
        const response = await userAPI.changePassword(formData);
        return response.data;
    }
}
