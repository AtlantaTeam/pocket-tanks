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
};

export type OAuthServiceIdResponse = {
    service_id: string
};

export type IDResponse = {
    id: number;
};

export type EmptyResponse = undefined;

export type ErrorResponse = AxiosError;

export type EmptyRequest = undefined;

export type LeaderBoardRequest = {
    data: {
        points: number,
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
        points: number,
    }
}[];
