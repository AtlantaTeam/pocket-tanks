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
    const [hasError, setHasError] = useState<{ error: string } | null>(null);
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
                setHasError({ error: 'Failed to fetch results from LeaderBoard!' });
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
                        // eslint-disable-next-line no-nested-ternary
                        !!players?.map && players.length ? players.map((item, index) => (
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
                            : (!players?.map || hasError) ? (new Error('Error happened')) : <Spinner />
                    }
                </div>
            </div>
        </Page>
    );
};
