import { Title } from 'components/components/Title/Title';
import React, { useEffect, useState } from 'react';
import './LeaderBoard.css';

import { getLeaderBoard } from 'controllers/leaderboard-controller';
import { LeaderBoardResponse } from 'api/types';
import { Page } from '../components/Page/Page';

// const players = [
//     {
//         display_name: 'Super Tankist 9000',
//     },
//     {
//         display_name: 'Mario Abrams',
//     },
//     {
//         display_name: 'Серый волк',
//     },
//     {
//         display_name: 'Красная шапочка',
//     },
//     {
//         display_name: 'Магомед Магедов',
//     },
//     {
//         display_name: 'Player 1',
//     },
//     {
//         display_name: 'Player 1455',
//     },
//     {
//         display_name: 'Batya Ivanicvich',
//     },
//     {
//         display_name: 'Пуля',
//     },
//     {
//         display_name: 'Ракета',
//     },
// ];

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
                console.log('Failed to fetch results from LeaderBoard!');
            });
    }, []);

    return (
        <Page>
            <div className="leader-board-container">
                <div className="leader-board-container">
                    <Title
                        className="title title_middle"
                        text="Лучшие стрелки"
                    />
                </div>
                {
                    players.map((item, index) => (
                        <div
                            key={item?.data?.name}
                            className="leader-name"
                        >
                            {`${String(index + 1)}   ${item?.data?.name}: ${item?.data?.points}`}
                        </div>
                    ))
                }
            </div>
        </Page>
    );
};
