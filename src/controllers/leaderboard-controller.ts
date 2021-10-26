import { leaderboadAPI } from '../api/leaderboard-api';

export const addUserResults = async (name: string, tankpoints: number) => {
    const response = await leaderboadAPI.add({
        data: {
            tankpoints,
            name,
        },
        ratingFieldName: 'tankpoints',
    });
    // console.log(response);
    return response.data;
};

export const getLeaderBoard = async () => {
    const response = await leaderboadAPI.getLeaderBoard({
        ratingFieldName: 'tankpoints',
        cursor: 0,
        limit: 10,
    });
    return response.data;
};
