import { objectToCamel } from 'ts-case-convert';
import { fetchUserAvatar } from '../components/Pages/fetchMethods/fetchUserAvatar';
import { userAPI } from '../api/user-api';
import { Avatar } from '../api/types';

export const changeProfile = async (formData: FormData) => {
    const response = await userAPI.changeProfile(formData);
    return objectToCamel(response.data);
};

export const changeAvatar = async (formData: FormData) => {
    const response = await userAPI.changeAvatar(formData);
    return objectToCamel(response.data);
};

export const changePassword = async (formData: FormData) => {
    const response = await userAPI.changePassword(formData);
    return response.data;
};

export const getUserAvatar = async () => {
    const response = await userAPI.getUserAvatar();
    return response.data;
};
