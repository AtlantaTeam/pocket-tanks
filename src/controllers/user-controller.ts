import { userAPI } from '../api/user-api';

export class UserController {
    public static async changeProfile(formData: FormData) {
        const response = await userAPI.changeProfile(formData);
        return response;
    }

    public static async changeAvatar(formData: FormData) {
        const response = await userAPI.changeAvatar(formData);
        return response;
    }

    public static async changePassword(formData: FormData) {
        const response = await userAPI.changePassword(formData);
        return response;
    }
}
