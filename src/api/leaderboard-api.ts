import { HTTPService, httpToAPI } from 'modules/http-service/http-service';
import {
    EmptyResponse, GetLeaderBoardRequest, LeaderBoardRequest, LeaderBoardResponse,
} from 'api/types';
import { LEADER_BOARD_ROUTES } from 'constants/api-routes';

class LeaderBoardAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
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

export const leaderboadAPI = new LeaderBoardAPI(httpToAPI);
