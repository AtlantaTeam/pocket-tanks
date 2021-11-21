import { Title } from 'components/components/Title/Title';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';

import './LeaderBoard.css';
import { Spinner } from 'components/Pages/Profile/Profile';
import { getLeaderBoard } from '../../../controllers/leaderboard-controller';
import { LeaderBoardResponse } from '../../../api/types';
import { Page } from '../components/Page/Page';

export const LeaderBoard = () => {
    const [players, setPlayers] = useState<LeaderBoardResponse>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getLeaderBoard()
            .then((data: LeaderBoardResponse) => {
                console.log('Results successfully fetched from LeaderBoard!');
                if (!data?.length) {
                    setPlayers([{
                        data: {
                            name: t('nothing'),
                            tankpoints: 0,
                        },
                    }]);
                } else {
                    setPlayers(data);
                }
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
                    text={t('bestOfTheBest')}
                />
                <div className="leader-board__container">
                    {
                        players?.length ? players.map((item, index) => (
                            <div
                                key={item?.data?.name}
                                className="leader-board__item"
                            >
                                {
                                    item?.data?.tankpoints
                                        ? `${String(index + 1)}     `
                                            + `${item?.data?.name}: ${item?.data?.tankpoints || ''}`
                                        : `${item?.data?.name}`
                                }
                            </div>
                        ))
                            : <Spinner />
                    }
                </div>
            </div>
        </Page>
    );
};
