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
};

export type ThemeResponse = {
    theme: string;
};

export type EmptyResponse = undefined;

export type ErrorResponse = AxiosError;

export type EmptyRequest = undefined;

export type LeaderBoardRequest = {
    data: {
        tankpoints: number,
        name: string,
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
    }
}[];
