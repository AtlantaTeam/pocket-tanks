import { ThreadAttributes, ThreadCreationAttributes } from 'db/models/Thread';
import { MessageAttributes, MessageCreationAttributes } from 'db/models/Message';
import { HTTPService, httpToServer } from '../modules/http-service/http-service';
import { FORUM_ROUTES } from '../constants/api-routes';

type MessageVote = {
    ratingVote: number,
    userId: number | null,
};

export class ForumAPI {
    public http: HTTPService;

    constructor(httpInstance: HTTPService) {
        this.http = httpInstance;
    }

    createThread(data: ThreadCreationAttributes) {
        return this.http.request.post<ThreadAttributes>(
            FORUM_ROUTES.CREATE_THREAD,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    createMessage(data: MessageCreationAttributes) {
        return this.http.request.post<MessageAttributes>(
            FORUM_ROUTES.CREATE_MESSAGE,
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    updateMessageVote(msgId: number, data: MessageVote) {
        return this.http.request.post<MessageAttributes>(
            FORUM_ROUTES.UPDATE_MESSAGE_VOTE(msgId),
            data,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            },
        );
    }

    getAllThreads() {
        return this.http.request.get<ThreadAttributes[]>(FORUM_ROUTES.GET_ALL_THREADS);
    }

    getThreadMessages(id: number) {
        return this.http.request.get<MessageAttributes[]>(FORUM_ROUTES.GET_THREAD_MESSAGES(id));
    }
}

export const forumAPI = new ForumAPI(httpToServer);
