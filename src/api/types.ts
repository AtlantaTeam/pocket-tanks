import type { AxiosError } from 'axios';

export type UserInfoResponse = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    imgAvatarBase64: string;
};

export type IDResponse = {
    id: number;
};

export type EmptyResponse = undefined;

export type ErrorResponse = AxiosError;

export type EmptyRequest = undefined;
