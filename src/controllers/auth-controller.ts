import { objectToCamel } from 'ts-case-convert';
import { authAPI } from '../api/auth-api';

export const login = async (formData: FormData) => {
    const response = await authAPI.login(formData);
    return response.data;
};

export const signup = async (formData: FormData) => {
    const response = await authAPI.signup(formData);
    return response.data;
};

export const getUserInfo = async () => {
    const response = await authAPI.getUserInfo();
    return objectToCamel(response.data);
};

export const getYandexUserInfo = async (token: string) => {
    const response = await authAPI.getOAuthYandexUserInfo(token);
    return objectToCamel(response.data);
};

export const logout = async () => {
    const response = await authAPI.logout();
    return response.data;
};
