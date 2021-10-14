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
    console.log(response.data);
    return objectToCamel(response.data);
};

export const logout = async () => {
    const response = await authAPI.logout();
    return response.data;
};
