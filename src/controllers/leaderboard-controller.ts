import { leaderboadAPI } from '../api/leaderboard-api';

export const addUserResults = async (name: string, points: number) => {
    const response = await leaderboadAPI.add({
        data: {
            points,
            name,
        },
        ratingFieldName: 'points',
    });
    // console.log(response);
    return response.data;
};

export const getLeaderBoard = async () => {
    const response = await leaderboadAPI.getLeaderBoard({
        ratingFieldName: 'points',
        cursor: 0,
        limit: 10,
    });
    return response.data;
};
