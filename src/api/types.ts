import type { AxiosError } from 'axios';

export type UserInfoResponse = {
    id: number;
    localId: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    // phone?: string;
    avatar: string;
    imgAvatarBase64: string;
    defaultAvatarId: string;
    userProvider: string;
};

export type YandexUserInfoResponse = {
    id: number,
    firstName: string;
    lastName: string;
    displayName: string;
    login: string;
    defaultEmail: string;
    defaultAvatarId: number;
};

export type Avatar = {
    cookie: string;
    avatarPath: string;
};

export type OAuthServiceIdResponse = {
    service_id: string
};

export type OAuthData = {
    code: string,
    redirect_uri: string,
};

export type IDResponse = {
    id: number;
    localId: number;
};

export type ThemeResponse = {
    theme: string;
};

export type LangResponse = {
    lang: string;
};

export type YandexTokenResponse = {
    'access_token': string;
    'refresh_token': string;
    'token_type': string;
    'expires_in': number;
    'error_description': string;
    'error': string;
};

export type ErrorResponse = AxiosError;

export type EmptyResponse = undefined;

export type EmptyRequest = undefined;

export type LeaderBoardRequest = {
    data: {
        tankpoints: number,
        userId: number,
    },
    ratingFieldName: string
};

export type GetLeaderBoardRequest = {
    ratingFieldName: string,
    cursor: number,
    limit: number,
};

export type LeaderBoardResponse = {
    data: {
        name: string,
        tankpoints: number,
    },
}[];
