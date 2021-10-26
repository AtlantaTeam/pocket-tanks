import { LEADER_BOARD_ROUTES } from 'constants/api-routes';
import {
    EmptyResponse, GetLeaderBoardRequest, LeaderBoardRequest, LeaderBoardResponse,
} from './types';
import { HTTPService, httpToServer } from '../modules/http-service/http-service';

export class LeaderBoardAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
    }

    add(data: LeaderBoardRequest) {
        return this.http.request.post<EmptyResponse>(
            LEADER_BOARD_ROUTES.ADD,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    addUserResults(data: LeaderBoardRequest) {
        return this.http.request.post<EmptyResponse>(
            LEADER_BOARD_ROUTES.ADD_USER_RESULTS,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    getLeaderBoard(data: GetLeaderBoardRequest) {
        return this.http.request.post<LeaderBoardResponse>(
            LEADER_BOARD_ROUTES.GET_ALL,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }
}

export const leaderboadAPI = new LeaderBoardAPI(httpToServer);
