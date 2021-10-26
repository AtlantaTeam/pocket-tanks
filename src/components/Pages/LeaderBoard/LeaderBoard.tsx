import { Title } from 'components/components/Title/Title';
import React, { useEffect, useState } from 'react';
import './LeaderBoard.css';

import { getLeaderBoard } from '../../../controllers/leaderboard-controller';
import { LeaderBoardResponse } from '../../../api/types';
import { Page } from '../components/Page/Page';

export const LeaderBoard = () => {
    const [players, setPlayers] = useState<LeaderBoardResponse>([]);

    useEffect(() => {
        getLeaderBoard()
            .then((data: LeaderBoardResponse) => {
                console.log('Results successfully fetched from LeaderBoard!');
                setPlayers(data);
                return true;
            })
            .catch(() => {
                throw new Error('Failed to fetch results from LeaderBoard!');
            });
    }, []);

    return (
        <Page>
            <div className="leader-board__wrapper">
                <Title
                    className="title title_middle leader-board__title"
                    text="Лучшие стрелки"
                />
                <div className="leader-board__container">
                    {
                        players.map((item, index) => (
                            <div
                                key={item?.data?.name}
                                className="leader-board__item"
                            >
                                {`${String(index + 1)}   ${item?.data?.name}: ${item?.data?.tankpoints}`}
                            </div>
                        ))
                    }
                </div>
            </div>
        </Page>
    );
};
